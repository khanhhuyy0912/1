import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import archiver from "archiver";
import { PORTFOLIO_OWNER_SYSTEM_INSTRUCTION, getFallbackAnswer } from "./server/chatKnowledge";

const ZIP_FILENAME = "tran_khanh_huy_portfolio_full_source.zip";

// Directories/files excluded from the generated source archive
const EXCLUDED_ENTRIES = new Set([
  "node_modules",
  ".git",
  "dist",
  ".env",
  ".DS_Store",
]);

// In-memory cache of the generated zip so repeat downloads don't re-zip every time.
let cachedZipBuffer: Buffer | null = null;

// Dynamically archive the project source into a zip Buffer (built on first request, then cached).
function buildProjectZipBuffer(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const chunks: Buffer[] = [];

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));
    archive.on("error", (err) => reject(err));
    archive.on("end", () => resolve(Buffer.concat(chunks)));

    const projectRoot = process.cwd();
    for (const entry of fs.readdirSync(projectRoot)) {
      if (EXCLUDED_ENTRIES.has(entry)) continue;
      const fullPath = path.join(projectRoot, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        archive.directory(fullPath, entry);
      } else {
        archive.file(fullPath, { name: entry });
      }
    }

    archive.finalize();
  });
}

async function getProjectZipBuffer(): Promise<Buffer> {
  if (!cachedZipBuffer) {
    cachedZipBuffer = await buildProjectZipBuffer();
  }
  return cachedZipBuffer;
}

// Lazy initialization of Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);
  if (validTimestamps.length >= limit) {
    return false;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

// Periodically purge IPs with no recent activity to prevent unbounded memory growth
const RATE_LIMIT_CLEANUP_WINDOW_MS = 5 * 60000; // 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const stillValid = timestamps.filter((t) => now - t < RATE_LIMIT_CLEANUP_WINDOW_MS);
    if (stillValid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, stillValid);
    }
  }
}, RATE_LIMIT_CLEANUP_WINDOW_MS).unref();

// In-memory stored contact messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

const receivedMessages: ContactMessage[] = [];
const newsletterSubscribers = new Set<string>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // Direct download endpoint for full source code zip (built dynamically, cached after first request)
  app.get(["/api/download-source", `/${ZIP_FILENAME}`], async (req, res) => {
    try {
      const zipBuffer = await getProjectZipBuffer();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${ZIP_FILENAME}"`);
      res.setHeader("Content-Length", zipBuffer.length.toString());
      res.status(200).send(zipBuffer);
    } catch (err) {
      console.error("Zip generation error:", err);
      res.status(500).json({ error: "Failed to generate source package." });
    }
  });

  // Base64 download endpoint for sandboxed iframe environments
  app.get("/api/download-source/base64", async (req, res) => {
    try {
      const zipBuffer = await getProjectZipBuffer();
      const base64Data = zipBuffer.toString("base64");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.json({
        filename: ZIP_FILENAME,
        size: zipBuffer.length,
        contentType: "application/zip",
        base64: base64Data,
      });
    } catch (err) {
      console.error("Base64 zip generation error:", err);
      res.status(500).json({ error: "Failed to generate source package." });
    }
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";

    // 1. Rate limiting check (max 5 requests per minute per IP)
    if (!checkRateLimit(ip, 5, 60000)) {
      return res.status(429).json({
        success: false,
        error: "Quá nhiều yêu cầu gửi liên hệ. Vui lòng thử lại sau 1 phút.",
      });
    }

    const { name, email, subject, message, honeypot } = req.body;

    // 2. Honeypot check for bots
    if (honeypot && honeypot.trim().length > 0) {
      // Silently discard spam bot submission
      return res.status(200).json({
        success: true,
        message: "Tin nhắn đã được gửi thành công!",
      });
    }

    // 3. Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Họ tên phải có ít nhất 2 ký tự.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Địa chỉ email không hợp lệ.",
      });
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: "Chủ đề phải có ít nhất 3 ký tự.",
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Nội dung tin nhắn phải có ít nhất 10 ký tự.",
      });
    }

    // 4. Record the message
    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    };

    receivedMessages.push(newMsg);
    console.log(`[Contact API] Received message from ${newMsg.name} <${newMsg.email}>: "${newMsg.subject}"`);

    // 5. Send a real email notification via Resend, if configured (optional — safe no-op otherwise)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.CONTACT_RECEIVER_EMAIL || "khanhhuyy0912@gmail.com",
            reply_to: newMsg.email,
            subject: `[Portfolio] ${newMsg.subject}`,
            text: `Từ: ${newMsg.name} <${newMsg.email}>\n\n${newMsg.message}`,
          }),
        });
        if (!resendRes.ok) {
          console.error("[Resend] Failed to send email:", await resendRes.text());
        }
      } catch (err) {
        // Never fail the request just because the notification email didn't go out —
        // the message is already safely stored above.
        console.error("[Resend] Email dispatch error:", err);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Cảm ơn bạn! Tin nhắn đã được gửi tới Trần Khánh Huy. Bạn sẽ nhận được phản hồi trong vòng 24 giờ.",
      autoReplySent: true,
      messageId: newMsg.id,
    });
  });

  // Multi-turn Gemini Chat API to ask about page owner (Tran Khanh Huy)
  app.post("/api/chat", async (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";

    // Rate limiting: max 25 requests per minute per IP for chat
    if (!checkRateLimit(ip, 25, 60000)) {
      return res.status(429).json({
        success: false,
        error: "Bạn đang gửi tin nhắn quá nhanh. Vui lòng đợi trong giây lát rồi thử lại.",
      });
    }

    const { messages, language = "vi" } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Danh sách tin nhắn không hợp lệ.",
      });
    }

    const lastMessage = messages[messages.length - 1]?.text || "";
    const lang: "vi" | "en" = language === "en" ? "en" : "vi";

    const ai = getGemini();

    // If API key is not configured or in offline demo mode, use the structured portfolio knowledge base
    if (!ai) {
      const fallbackReply = getFallbackAnswer(lastMessage, lang);
      return res.status(200).json({
        success: true,
        reply: fallbackReply,
        source: "portfolio_knowledge_base",
      });
    }

    try {
      // Map chat history into Gemini contents format
      const formattedContents = messages
        .filter((m: any) => m && typeof m.text === "string" && m.text.trim())
        .slice(-12) // Keep last 12 turns for context
        .map((m: any) => ({
          role: m.role === "model" || m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text.trim() }],
        }));

      // Ensure the first message is from 'user'
      let validContents = formattedContents;
      while (validContents.length > 0 && validContents[0].role === "model") {
        validContents = validContents.slice(1);
      }

      if (validContents.length === 0) {
        validContents = [{ role: "user", parts: [{ text: lastMessage || "Xin chào" }] }];
      }

      // Call Gemini 3.8 Flash model
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: validContents,
        config: {
          systemInstruction: PORTFOLIO_OWNER_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "";

      if (!replyText.trim()) {
        const fallbackReply = getFallbackAnswer(lastMessage, lang);
        return res.status(200).json({
          success: true,
          reply: fallbackReply,
          source: "fallback",
        });
      }

      return res.status(200).json({
        success: true,
        reply: replyText,
        source: "gemini-3.8-flash",
      });
    } catch (err: any) {
      console.error("[Chat API Error]:", err?.message || err);
      // Resilience fallback: always answer user questions gracefully
      const fallbackReply = getFallbackAnswer(lastMessage, lang);
      return res.status(200).json({
        success: true,
        reply: fallbackReply,
        source: "portfolio_knowledge_base_resilience",
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Email không hợp lệ.",
      });
    }

    newsletterSubscribers.add(email.trim().toLowerCase());
    return res.status(200).json({
      success: true,
      message: "Đăng ký nhận bản tin công nghệ thành công!",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

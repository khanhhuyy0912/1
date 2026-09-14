/**
 * Artistic Developer Console Easter Egg
 */
export function initConsoleEasterEgg() {
  if (typeof window === "undefined") return;

  const styles = [
    "color: #6366f1",
    "font-size: 14px",
    "font-weight: bold",
    "padding: 8px 12px",
    "background: #18181b",
    "border-radius: 6px",
    "border: 1px solid #4f46e5",
  ].join(";");

  const titleStyle = "color: #38bdf8; font-weight: 800; font-size: 16px;";
  const textStyle = "color: #a1a1aa; font-size: 12px;";

  console.log(
    `%c
   █████╗ ██╗     ███████╗██╗  ██╗    ███╗   ██╗ ██████╗ ██╗   ██╗██╗   ██╗███████╗███╗   ██╗
  ██╔══██╗██║     ██╔════╝╚██╗██╔╝    ████╗  ██║██╔════╝ ██║   ██║╚██╗ ██╔╝██╔════╝████╗  ██║
  ███████║██║     █████╗   ╚███╔╝     ██╔██╗ ██║██║  ███╗██║   ██║ ╚████╔╝ █████╗  ██╔██╗ ██║
  ██╔══██║██║     ██╔══╝   ██╔██╗     ██║╚██╗██║██║   ██║██║   ██║  ╚██╔╝  ██╔══╝  ██║╚██╗██║
  ██║  ██║███████╗███████╗██╔╝ ██╗    ██║ ╚████║╚██████╔╝╚██████╔╝   ██║   ███████╗██║ ╚████║
  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝
    `,
    "color: #818cf8; font-family: monospace; font-weight: bold;"
  );

  console.log("%c👋 Xin chào nhà tuyển dụng & kỹ sư tò mò!", titleStyle);
  console.log(
    "%cBạn đang xem mã nguồn của Tran Khanh Huy (Trần Khánh Huy) — Full-Stack Developer.\n" +
    "Chuyên môn cốt lõi: Claude, Codex, Antigravity, React, Next.js, Node.js & Scalable Architecture.\n" +
    "Muốn trao đổi về cơ hội hợp tác hoặc thảo luận kỹ thuật? Hãy kết nối qua:\n" +
    "📧 Email: khanhhuyy0912@gmail.com | 💼 LinkedIn: linkedin.com/in/khanh-huy-tran-7b4a02436",
    textStyle
  );
  console.log("%c🚀 Status: Ready to build high-impact Full-Stack & Agentic AI solutions.", styles);
}

export const initEasterEgg = initConsoleEasterEgg;

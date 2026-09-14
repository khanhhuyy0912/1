# Tran Khanh Huy — Senior Full-Stack & Cloud Solutions Architect Portfolio

> A production-grade, enterprise portfolio and AI Agent platform engineered with React 19, TypeScript, Tailwind CSS, Express, and Gemini 3.8 Flash, wrapped in an iOS Liquid Glass aesthetic.

---

## 🚀 Key Highlights

- **iOS Liquid Glass Interface**: Custom layered blur filters (`backdrop-blur-2xl`), specular top rim highlights, and physics-driven spring animations (`motion/react`).
- **Interactive Gemini 3.8 AI Persona**:
  - Multi-turn conversational chatbot representing Tran Khanh Huy.
  - Server-side proxy (`/api/chat`) using `@google/genai` TypeScript SDK.
  - Speech Synthesis (Text-to-Speech) & Speech Recognition (Voice input).
  - Quick-explore topic chips, copy-to-clipboard, markdown code blocks, and contextual routing.
- **Enterprise Engineering Portfolio**:
  - Real-world case studies: *NexusCloud Multi-Region Mesh*, *FinTrack AI Banking Suite*, *ShopPulse High-Concurrency E-Commerce*, *DevLens Observability Platform*.
  - Full printable A4 Curriculum Vitae at `/resume`.
  - Tech articles and architectural deep-dives at `/blog`.
  - Command Palette (`⌘K` / `Ctrl+K`) for lightning-fast keyboard navigation.
  - Dual-language support (Vietnamese & English) and dynamic theme switching (Dark & Light).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Motion (`motion/react`), React Markdown.
- **Backend**: Node.js, Express, `@google/genai` SDK, `dotenv`.
- **Packaging & Build**: `esbuild` bundled CommonJS server (`dist/server.cjs`), Vite static asset pipeline.

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### 2. Installation
```bash
# Clone or unzip project repository
cd tran_khanh_huy_portfolio

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your `GEMINI_API_KEY`:
```env
GEMINI_API_KEY="your-gemini-api-key"
CONTACT_RECEIVER_EMAIL="khanhhuyy0912@gmail.com"
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Production Build & Run
```bash
# Build frontend and bundle server
npm run build

# Start production server
npm start
```

---

## 📂 Project Structure

```
├── index.html                  # HTML entry point with SEO & OpenGraph tags
├── package.json                # Project dependencies and build scripts
├── server.ts                   # Express server entry point & API endpoints
├── server/
│   └── chatKnowledge.ts        # Comprehensive Knowledge Base & System Prompt
├── src/
│   ├── main.tsx                # React root mount
│   ├── App.tsx                 # Core App layout & route switches
│   ├── types.ts                # TypeScript interfaces & types
│   ├── index.css               # Global styles & iOS glass utility classes
│   ├── context/
│   │   ├── LanguageContext.tsx # EN/VI state & comprehensive dictionaries
│   │   └── ThemeContext.tsx    # Light/Dark mode state & system detector
│   ├── data/
│   │   └── portfolioData.ts    # Comprehensive projects, blogs, timeline data
│   ├── components/
│   │   ├── common/
│   │   │   ├── GeminiChatbot.tsx    # Multi-turn AI persona assistant
│   │   │   ├── LiquidBackground.tsx # Ambient canvas glow mesh
│   │   │   └── SeoHead.tsx          # Dynamic title and meta tags
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Responsive top glass navigation bar
│   │   │   ├── Footer.tsx           # Rich footer with links, source download
│   │   │   └── CommandPalette.tsx   # Cmd+K universal search dialog
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutPreviewSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── ContactCtaSection.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── ProjectsPage.tsx
│       ├── ProjectDetailPage.tsx
│       ├── BlogPage.tsx
│       ├── BlogPostPage.tsx
│       ├── ResumePage.tsx
│       ├── ContactPage.tsx
│       ├── PrivacyPage.tsx
│       └── TermsPage.tsx
└── public/
    └── tran_khanh_huy_portfolio_full_source.zip # Full downloadable package
```

---

## 👤 Author

**Trần Khánh Huy (Tran Khanh Huy)**
- Senior Full-Stack Developer & Cloud Solutions Architect
- 📧 Email: `khanhhuyy0912@gmail.com`
- 🐙 GitHub: [github.com/hoangtuphowall](https://github.com/hoangtuphowall)
- 💼 LinkedIn: [linkedin.com/in/khanh-huy-tran-7b4a02436](https://www.linkedin.com/in/khanh-huy-tran-7b4a02436)
- 📅 Schedule a call: [cal.com/hoangtuphowall](https://cal.com/hoangtuphowall)

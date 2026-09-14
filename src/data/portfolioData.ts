import { Project, SkillCategory, Experience, Education, BlogPost, Testimonial } from '../types';

export const personalInfo = {
  name: 'Tran Khanh Huy',
  fullNameVi: 'Trần Khánh Huy',
  role: {
    vi: 'Full-Stack Developer',
    en: 'Full-Stack Developer',
  },
  tagline: {
    vi: 'Full-Stack Developer chuyên sâu xây dựng các ứng dụng web hiện đại, kiến trúc phân tán và giải pháp Agentic AI với Claude, Codex, Antigravity.',
    en: 'Full-Stack Developer specializing in modern web applications, scalable architectures, and agentic AI workflows with Claude, Codex, Antigravity.',
  },
  bio: {
    vi: `Tôi là Tran Khanh Huy (Trần Khánh Huy), một Full-Stack Developer đam mê công nghệ phần mềm hiện đại và tích hợp trí tuệ nhân tạo (Agentic AI / LLMs). Tôi chuyên sâu trong việc khai thác tối đa sức mạnh của Claude, OpenAI Codex và Antigravity để nâng cao tốc độ phát triển sản phẩm, giải quyết bài toán phức tạp từ Frontend (React, Next.js, TypeScript) đến Backend & Cloud (Node.js, Go, PostgreSQL, Docker), mang lại trải nghiệm người dùng tinh tế và hiệu suất vượt trội.`,
    en: `I am Tran Khanh Huy, a Full-Stack Developer passionate about cutting-edge web technologies and agentic AI integrations. I specialize in leveraging Claude, OpenAI Codex, and Antigravity to accelerate modern product delivery, tackling complex challenges from responsive Frontend systems (React, Next.js, TypeScript) to resilient Backends (Node.js, Go, PostgreSQL, Docker).`,
  },
  avatar: '/avatar.png',
  location: 'Ho Chi Minh City, Vietnam (Available for Global Remote)',
  email: 'khanhhuyy0912@gmail.com',
  phone: '+84 396 786 315',
  workingHours: {
    vi: 'Thứ 2 - Thứ 6: 09:00 - 18:00 (GMT+7) • Hỗ trợ linh hoạt múi giờ US/EU',
    en: 'Mon - Fri: 09:00 - 18:00 (GMT+7) • Flexible overlap for US/EU timezones',
  },
  github: 'https://github.com/hoangtuphowall',
  linkedin: 'https://www.linkedin.com/in/khanh-huy-tran-7b4a02436',
  twitter: 'https://twitter.com/trankhanhhuy',
  calendarLink: 'https://cal.com/hoangtuphowall',
  stats: {
    yearsExp: '4+',
    projectsCount: '28+',
    systemUptime: '99.99%',
    dailyRequests: '12M+',
    codeCommits: '3,200+',
  },
  workPhilosophy: [
    {
      title: { vi: 'Ứng dụng AI & Agentic Tooling vào quy trình', en: 'AI & Agentic Development Velocity' },
      desc: {
        vi: 'Tận dụng triệt để Claude, Codex và Antigravity để tự động hóa kiểm thử, tối ưu cấu trúc code và giải phóng tư duy sáng tạo cho các bài toán logic cấp cao.',
        en: 'Leverage Claude, Codex, and Antigravity to automate testing loops, scaffold robust architectures, and focus cognitive energy on high-level system logic.',
      },
    },
    {
      title: { vi: 'Kiến trúc phục vụ bài toán thực tế', en: 'Architecture Grounded in Reality' },
      desc: {
        vi: 'Không lạm dụng microservices hay công nghệ thời thượng khi một modular monolith tối ưu có thể đáp ứng tốt hơn và tiết kiệm chi phí vận hành.',
        en: 'Avoid over-engineering with microservices when an optimized modular monolith delivers superior throughput with minimal operational overhead.',
      },
    },
    {
      title: { vi: 'Đo lường & Tối ưu bằng số liệu', en: 'Metric-Driven Optimization' },
      desc: {
        vi: 'Mọi quyết định cải tiến hiệu năng đều phải có baseline telemetry: p95/p99 latency, RPS, memory footprints và CPU profiling.',
        en: 'Every performance refactor is verified against baseline metrics: p95/p99 latency, RPS, memory footprints, and CPU profiling traces.',
      },
    },
    {
      title: { vi: 'Bảo mật & Tính toàn vẹn dữ liệu', en: 'Security & Zero-Trust Integrity' },
      desc: {
        vi: 'Hệ thống tài chính và người dùng phải đảm bảo Idempotency, rate limiting đa tầng, sanitization hai phía và mã hóa end-to-end.',
        en: 'Mission-critical user and financial flows enforce strict idempotency keys, multi-layer rate limiting, dual-side sanitization, and end-to-end encryption.',
      },
    },
  ],
};

export const skillsData: SkillCategory[] = [
  {
    id: 'ai',
    title: { vi: 'Agentic AI & LLM Tooling', en: 'Agentic AI & LLM Tooling' },
    iconName: 'Sparkles',
    skills: [
      { name: 'Claude (Anthropic)', level: 98, experience: '3 yrs', description: { vi: 'Prompt Engineering, Tool Use / Function Calling, Extended Thinking, Context Caching, Artifacts & Agentic Workflows', en: 'Prompt Engineering, Tool Use / Function Calling, Extended Thinking, Context Caching, Artifacts & Agentic Workflows' } },
      { name: 'OpenAI Codex & Code LLMs', level: 96, experience: '3 yrs', description: { vi: 'Automated synthesis, AST analysis, Context injection, Automated test generation & Refactoring', en: 'Automated synthesis, AST analysis, Context injection, Automated test generation & Refactoring' } },
      { name: 'Antigravity Agent Platform', level: 95, experience: '2 yrs', description: { vi: 'Autonomous multi-agent coordination, Task planning, Sandboxed tool execution, Full-Stack scaffolding', en: 'Autonomous multi-agent coordination, Task planning, Sandboxed tool execution, Full-Stack scaffolding' } },
      { name: 'RAG & Vector Embeddings', level: 92, experience: '2 yrs', description: { vi: 'Vector databases, Hybrid semantic search, Chunking strategies, Grounded context injection', en: 'Vector databases, Hybrid semantic search, Chunking strategies, Grounded context injection' } },
    ],
  },
  {
    id: 'frontend',
    title: { vi: 'Frontend & UI Engineering', en: 'Frontend & UI Engineering' },
    iconName: 'Layout',
    skills: [
      { name: 'React 19 / 18', level: 96, experience: '5 yrs', description: { vi: 'Hooks, Concurrent Mode, Virtual DOM internals, Custom state machines', en: 'Hooks, Concurrent Mode, Virtual DOM internals, Custom state machines' } },
      { name: 'Next.js (App Router)', level: 94, experience: '4 yrs', description: { vi: 'Server Components (RSC), Streaming SSR, Route Handlers, ISR/SSG', en: 'Server Components (RSC), Streaming SSR, Route Handlers, ISR/SSG' } },
      { name: 'TypeScript (Strict)', level: 95, experience: '5 yrs', description: { vi: 'Generics, Conditional Types, Type Narrowing, Schema Inference with Zod', en: 'Generics, Conditional Types, Type Narrowing, Schema Inference with Zod' } },
      { name: 'Tailwind CSS & Design Systems', level: 95, experience: '4 yrs', description: { vi: 'Design Tokens, Radix Primitives, Responsive Grid, Accessible UI/a11y', en: 'Design Tokens, Radix Primitives, Responsive Grid, Accessible UI/a11y' } },
      { name: 'State Management', level: 92, experience: '5 yrs', description: { vi: 'Zustand, TanStack Query (React Query), Redux Toolkit, Context API', en: 'Zustand, TanStack Query (React Query), Redux Toolkit, Context API' } },
      { name: 'Animations & Micro-interactions', level: 90, experience: '3 yrs', description: { vi: 'Framer Motion / Motion, Canvas 2D API, Responsive gestures & layouts', en: 'Framer Motion / Motion, Canvas 2D API, Responsive gestures & layouts' } },
    ],
  },
  {
    id: 'backend',
    title: { vi: 'Backend & Distributed Systems', en: 'Backend & Distributed Systems' },
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express / NestJS', level: 94, experience: '7 yrs', description: { vi: 'Event Loop profiling, Stream processing, Worker threads, RESTful & GraphQL', en: 'Event Loop profiling, Stream processing, Worker threads, RESTful & GraphQL' } },
      { name: 'Go (Golang)', level: 88, experience: '4 yrs', description: { vi: 'Goroutines, Channels, Microservices gRPC, High-throughput network services', en: 'Goroutines, Channels, Microservices gRPC, High-throughput network services' } },
      { name: 'PostgreSQL & SQL Tuning', level: 92, experience: '6 yrs', description: { vi: 'Indexing strategies (B-Tree/GIN), Query plans (EXPLAIN ANALYZE), Partitioning', en: 'Indexing strategies (B-Tree/GIN), Query plans (EXPLAIN ANALYZE), Partitioning' } },
      { name: 'Redis (Caching & Pub/Sub)', level: 90, experience: '5 yrs', description: { vi: 'Distributed locks (Redlock), Cache invalidation, Rate limiting, Streams', en: 'Distributed locks (Redlock), Cache invalidation, Rate limiting, Streams' } },
      { name: 'Message Brokers (Kafka / RabbitMQ)', level: 87, experience: '4 yrs', description: { vi: 'Event-driven architecture, Consumer groups, Exactly-once processing', en: 'Event-driven architecture, Consumer groups, Exactly-once processing' } },
      { name: 'API Security & OAuth2 / JWT', level: 93, experience: '6 yrs', description: { vi: 'RBAC, OIDC, CSRF/XSS hardening, PKCE, API Key rotation, Rate limits', en: 'RBAC, OIDC, CSRF/XSS hardening, PKCE, API Key rotation, Rate limits' } },
    ],
  },
  {
    id: 'cloud',
    title: { vi: 'Cloud Infrastructure & DevOps', en: 'Cloud Infrastructure & DevOps' },
    iconName: 'Cloud',
    skills: [
      { name: 'Docker & Containerization', level: 92, experience: '6 yrs', description: { vi: 'Multi-stage builds, Alpine optimizations, Image security scanning', en: 'Multi-stage builds, Alpine optimizations, Image security scanning' } },
      { name: 'Kubernetes (K8s)', level: 85, experience: '4 yrs', description: { vi: 'Deployments, Ingress controllers, Helm charts, HPA auto-scaling', en: 'Deployments, Ingress controllers, Helm charts, HPA auto-scaling' } },
      { name: 'AWS & Cloud Native Services', level: 90, experience: '5 yrs', description: { vi: 'ECS Fargate, Lambda, S3, RDS, CloudFront, SQS, CloudWatch', en: 'ECS Fargate, Lambda, S3, RDS, CloudFront, SQS, CloudWatch' } },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 93, experience: '5 yrs', description: { vi: 'Automated test matrices, Zero-downtime blue/green deployments, SemVer', en: 'Automated test matrices, Zero-downtime blue/green deployments, SemVer' } },
      { name: 'Observability (Prometheus, Grafana)', level: 86, experience: '4 yrs', description: { vi: 'Distributed tracing (OpenTelemetry), Metrics alerting, Centralized logs', en: 'Distributed tracing (OpenTelemetry), Metrics alerting, Centralized logs' } },
    ],
  },
  {
    id: 'arch',
    title: { vi: 'Kiến trúc & Kỹ năng giải pháp', en: 'Architecture & Engineering Leadership' },
    iconName: 'Cpu',
    skills: [
      { name: 'System Design & Scalability', level: 94, experience: '6 yrs', description: { vi: 'Microservices vs Modular Monolith, CAP Theorem, Database sharding', en: 'Microservices vs Modular Monolith, CAP Theorem, Database sharding' } },
      { name: 'Clean Architecture & DDD', level: 91, experience: '5 yrs', description: { vi: 'Domain-Driven Design, Hexagonal architecture, Separation of concerns', en: 'Domain-Driven Design, Hexagonal architecture, Separation of concerns' } },
      { name: 'Technical Leadership & Mentoring', level: 90, experience: '4 yrs', description: { vi: 'Code reviews, RFC specifications, Agile sprints, Cross-team alignment', en: 'Code reviews, RFC specifications, Agile sprints, Cross-team alignment' } },
      { name: 'Testing (TDD, Vitest, Playwright)', level: 90, experience: '6 yrs', description: { vi: 'Integration tests, End-to-End browser tests, Mocking network layers', en: 'Integration tests, End-to-End browser tests, Mocking network layers' } },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: 'omniagent-workspace',
    slug: 'omniagent-workspace',
    title: {
      vi: 'OmniAgent Workspace — Nền Tảng Autonomous Coding & Workflow Automation',
      en: 'OmniAgent Workspace — Autonomous Coding & Workflow Orchestration',
    },
    subtitle: {
      vi: 'Hệ thống tự động hóa lập trình và điều phối Agentic AI đa mô hình kết hợp Claude 3.5 Sonnet, OpenAI Codex và engine Antigravity để xây dựng web app toàn diện.',
      en: 'Multi-agent developer workbench orchestrating Claude, OpenAI Codex, and Antigravity execution engines to scaffold and test full-stack web applications.',
    },
    category: 'fullstack',
    year: '2025',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'OmniAgent Workspace là nền tảng Full-Stack cho phép lập trình viên điều phối các mô hình ngôn ngữ lớn (Claude, Codex) cùng môi trường Antigravity Agent để tự động phân tích issue, lập trình tính năng mới, sinh test suite và biên dịch trong môi trường container an toàn.',
      en: 'OmniAgent Workspace is an enterprise full-stack platform enabling engineering teams to orchestrate LLMs (Claude, Codex) alongside the Antigravity agent runtime to autonomously analyze specifications, scaffold codebases, run test suites, and deploy sandboxed containers.',
    },
    problem: {
      vi: 'Quy trình phát triển phần mềm truyền thống tốn nhiều thời gian cho việc viết boilerplate, thiết lập môi trường, và viết unit tests lặp đi lặp lại, khiến tốc độ ra mắt sản phẩm (Time-to-Market) bị kéo dài.',
      en: 'Engineering teams waste dozens of hours each sprint writing boilerplate code, configuring environments, and maintaining repetitive regression suites, delaying critical feature delivery.',
    },
    solution: {
      vi: 'Tích hợp Claude 3.5 Extended Thinking cho phân tích kiến trúc, OpenAI Codex cho tổng hợp mã nguồn cấp tốc độ cao, và nền tảng Antigravity để điều phối sub-agents thực thi các công cụ bash, linting và build tự động trong thời gian thực với WebSockets.',
      en: 'Integrated Claude 3.5 for architectural planning, OpenAI Codex for rapid syntax synthesis, and the Antigravity agent harness for sandboxed multi-agent execution with real-time streaming WebSockets.',
    },
    myRole: {
      vi: 'Full-Stack Developer: Thiết kế kiến trúc tổng thể, xây dựng giao diện tương tác thời gian thực bằng React 19 + Tailwind CSS, và phát triển tầng điều phối Agentic API trên Node.js.',
      en: 'Full-Stack Developer: Architected the end-to-end platform, built the real-time responsive dashboard with React 19 and Tailwind CSS, and implemented the backend agentic orchestration service.',
    },
    results: [
      { metric: '75%', label: { vi: 'Rút ngắn thời gian Scaffolding', en: 'Reduction in Scaffolding Time' } },
      { metric: '98.5%', label: { vi: 'Độ chính xác biên dịch mã nguồn', en: 'Syntax Compilation Accuracy' } },
      { metric: '100%', label: { vi: 'Môi trường Docker Sandboxed', en: 'Sandboxed Isolation' } },
      { metric: '5,000+', label: { vi: 'Tasks thực thi tự động / ngày', en: 'Autonomous Tasks Executed / Day' } },
    ],
    techStack: ['Claude 3.5 Sonnet', 'OpenAI Codex', 'Antigravity Platform', 'React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Docker', 'WebSocket'],
    demoUrl: 'https://omniagent.example.com',
    githubUrl: 'https://github.com/hoangtuphowall/omniagent-workspace',
    metricsSummary: '75% Faster Scaffolding • 98.5% Accuracy • Docker Sandboxed',
  },
  {
    id: 'nexus-pay',
    slug: 'nexus-pay',
    title: {
      vi: 'NexusPay — Cổng Thanh Toán Phân Tán Chịu Tải Cao',
      en: 'NexusPay — High-Concurrency Distributed Payment Gateway',
    },
    subtitle: {
      vi: 'Hệ thống xử lý thanh toán đa kênh đạt chuẩn PCI-DSS với cơ chế Idempotency chống duplicate giao dịch và xử lý 12,000 TPS.',
      en: 'Multi-channel PCI-DSS compliant payment processing engine with distributed idempotency and 12,000 peak TPS capacity.',
    },
    category: 'cloud',
    year: '2024',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'NexusPay là hệ thống lõi xử lý thanh toán kết nối giữa các đơn vị thương mại điện tử và các ngân hàng đối tác quốc tế. Hệ thống giải quyết bài toán giao dịch đồng thời lớn trong các ngày Flash Sale mà không gây nghẽn hàng đợi hoặc mất mát dữ liệu.',
      en: 'NexusPay is a core transaction gateway bridging major e-commerce merchants with international banking networks. Built to handle massive concurrent transaction bursts during flash sales with zero duplicate charges.',
    },
    problem: {
      vi: 'Hệ thống cũ thường xuyên gặp tình trạng timeout khi số lượng giao dịch vượt quá 3,000 TPS trong ngày hội mua sắm. Khách hàng bấm thanh toán nhiều lần gây duplicate charge, gây tổn thất doanh thu và làm tắc nghẽn bộ phận hỗ trợ đối soát.',
      en: 'The legacy monolith suffered severe lock contention and timeouts during 3,000+ TPS traffic surges. Repeated client clicks caused duplicate charges, leading to chargeback penalties and manual reconciliation overhead.',
    },
    solution: {
      vi: 'Tái thiết kế toàn bộ luồng thanh toán sang kiến trúc Event-Driven sử dụng Go cho microservices xử lý giao dịch, Apache Kafka làm message backbone, Redis Distributed Lock cho Idempotency Key, và PostgreSQL partitioning cho lưu trữ sổ cái tài chính.',
      en: 'Re-architected the pipeline into an event-driven microservices ecosystem using Go for transaction workers, Apache Kafka as the durable event backbone, Redis distributed locking for idempotency, and partitioned PostgreSQL ledger tables.',
    },
    myRole: {
      vi: 'Lead Architect & Core Backend Engineer: Thiết kế kiến trúc phân tán tổng thể, trực tiếp lập trình module Idempotent Transaction Lock, và thiết lập pipeline quan sát giám sát Prometheus/Grafana với cảnh báo tự động.',
      en: 'Lead Architect & Core Backend Engineer: Authored the system architecture RFC, engineered the distributed idempotent locking mechanism, and established comprehensive OpenTelemetry/Grafana dashboards.',
    },
    results: [
      { metric: '12,500+', label: { vi: 'Peak TPS xử lý thành công', en: 'Peak TPS sustained' } },
      { metric: '99.995%', label: { vi: 'Tỷ lệ Uptime thực tế', en: 'Production Uptime' } },
      { metric: '48ms', label: { vi: 'Độ trễ p99 trung bình', en: 'p99 Gateway Latency' } },
      { metric: '0%', label: { vi: 'Lỗi Duplicate Charge', en: 'Duplicate Charge Rate' } },
    ],
    techStack: ['Go (Golang)', 'Node.js', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker', 'Kubernetes', 'AWS'],
    demoUrl: 'https://nexuspay-demo.example.com',
    githubUrl: 'https://github.com/hoangtuphowall/nexuspay-core',
    metricsSummary: '12,500 TPS • 99.995% Uptime • p99: 48ms',
  },
  {
    id: 'hyper-store',
    slug: 'hyper-store',
    title: {
      vi: 'HyperStore 3D — Nền Tảng Thương Mại Điện Tử Headless',
      en: 'HyperStore 3D — Headless Ultra-Fast E-Commerce Platform',
    },
    subtitle: {
      vi: 'Trải nghiệm mua sắm thế hệ mới với xem trước sản phẩm 3D thời gian thực, Next.js 14 App Router, Algolia Search và thanh toán Stripe.',
      en: 'Next-gen e-commerce storefront featuring interactive 3D product previews, sub-100ms Algolia search, and instant checkout.',
    },
    category: 'fullstack',
    year: '2024',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'HyperStore được phát triển cho thương hiệu thời trang cao cấp quốc tế, kết hợp giao diện headless linh hoạt với mô hình 3D tương tác giúp khách hàng xem trước chất liệu, góc độ và màu sắc trước khi đặt hàng.',
      en: 'HyperStore was developed for an international luxury retail brand, combining a headless React storefront with interactive 3D WebGL configurators to elevate conversion rates.',
    },
    problem: {
      vi: 'Trang thương mại cũ dùng WooCommerce quá chậm (LCP > 4.2s), tỷ lệ bounce rate trên thiết bị di động lên tới 68%, không hỗ trợ tùy biến 3D trực quan khiến tỷ lệ đổi trả hàng cao.',
      en: 'The prior monolithic WooCommerce platform was critically sluggish (LCP > 4.2s) with mobile bounce rates exceeding 68% and high product return rates due to flat 2D photography.',
    },
    solution: {
      vi: 'Chuyển đổi sang Next.js App Router với Incremental Static Regeneration (ISR), tích hợp Three.js / React Three Fiber cho renderer 3D tối ưu dung lượng model <1.5MB, và CDN Edge caching tại 200+ điểm toàn cầu.',
      en: 'Engineered a modern Next.js App Router frontend with ISR, integrated Three.js / React Three Fiber with Draco-compressed 3D models (<1.5MB), and cached dynamic routes on globally distributed Edge CDNs.',
    },
    myRole: {
      vi: 'Full-Stack Technical Lead: Xây dựng kiến trúc frontend, thiết kế GraphQL API schema, tích hợp Stripe Webhooks và tối ưu hóa 3D asset pipeline.',
      en: 'Full-Stack Technical Lead: Architected the frontend application, designed GraphQL API gateway, integrated Stripe Webhooks, and built the automated 3D asset compression pipeline.',
    },
    results: [
      { metric: '0.8s', label: { vi: 'Largest Contentful Paint (LCP)', en: 'Core Web Vital LCP' } },
      { metric: '+34%', label: { vi: 'Tăng tỷ lệ chuyển đổi', en: 'Conversion Rate Lift' } },
      { metric: '-22%', label: { vi: 'Giảm tỷ lệ đổi trả hàng', en: 'Product Return Reduction' } },
      { metric: '98/100', label: { vi: 'Điểm Google Lighthouse', en: 'Lighthouse Score' } },
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GraphQL', 'Stripe', 'Redis', 'Algolia'],
    demoUrl: 'https://hyperstore-preview.example.com',
    githubUrl: 'https://github.com/alex-nguyen/hyperstore-headless',
    metricsSummary: '0.8s LCP • +34% Conversion • 98 Lighthouse',
  },
  {
    id: 'collab-flow',
    slug: 'collab-flow',
    title: {
      vi: 'CollabFlow — Bảng Trắng Cộng Tác Thời Gian Thực (CRDT)',
      en: 'CollabFlow — Real-Time Multiplayer Collaborative Whiteboard',
    },
    subtitle: {
      vi: 'Ứng dụng vẽ và brainstorm ý tưởng đồng thời cho 100+ kỹ sư trên cùng canvas với thuật toán giải quyết xung đột CRDT (Yjs) và WebSockets.',
      en: 'Multiplayer collaborative infinite canvas supporting 100+ concurrent engineers with zero-conflict CRDT syncing and WebSockets.',
    },
    category: 'frontend',
    year: '2023',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'CollabFlow là công cụ làm việc trực quan giúp các đội ngũ kỹ sư và thiết kế vẽ sơ đồ kiến trúc, ghi chú post-it và chia sẻ ý tưởng trực tiếp với con trỏ chuột mượt mà 60 FPS.',
      en: 'CollabFlow is a high-performance visual collaboration engine enabling engineering and product teams to map system diagrams, mind maps, and live cursor interactions at smooth 60 FPS.',
    },
    problem: {
      vi: 'Các công cụ cộng tác trực tuyến thông thường gặp tình trạng lag giật khi canvas có trên 5,000 hình khối, đồng thời dễ phát sinh conflict dữ liệu khi nhiều người dùng sửa cùng một đối tượng.',
      en: 'Traditional canvas tools drop frames when element counts surpass 5,000 shapes and suffer from destructive data overwrites when multiple participants edit concurrently.',
    },
    solution: {
      vi: 'Áp dụng HTML5 Canvas 2D kết hợp Spatial Indexing (R-Tree) chỉ vẽ các đối tượng trong Viewport; sử dụng cấu trúc dữ liệu Yjs CRDT qua WebSockets để đồng bộ trạng thái phân tán không cần khóa server.',
      en: 'Implemented HTML5 Canvas with Spatial Indexing (R-Tree) for viewport-only rendering, coupled with Yjs CRDT over binary WebSockets for peer state synchronization without server locks.',
    },
    myRole: {
      vi: 'Sole Architect & Frontend Engineer: Thiết kế engine đồ họa canvas 2D, tối ưu hóa bộ nhớ garbage collection, và triển khai cụm WebSocket clustering.',
      en: 'Sole Architect & Frontend Engineer: Engineered the 2D canvas rendering engine, optimized garbage collection overhead, and deployed WebSocket clustering with Redis adapter.',
    },
    results: [
      { metric: '60 FPS', label: { vi: 'Duy trì ổn định với 15k objects', en: 'Maintained with 15k objects' } },
      { metric: '< 25ms', label: { vi: 'Độ trễ đồng bộ con trỏ', en: 'Cursor Sync Latency' } },
      { metric: '100+', label: { vi: 'Người dùng đồng thời / board', en: 'Concurrent Users / Room' } },
      { metric: '0', label: { vi: 'Xung đột ghi đè dữ liệu', en: 'State Conflicts' } },
    ],
    techStack: ['React', 'TypeScript', 'WebSockets', 'Yjs CRDT', 'Canvas API', 'Node.js', 'Redis', 'Docker'],
    demoUrl: 'https://collabflow.example.com',
    githubUrl: 'https://github.com/hoangtuphowall/collabflow-core',
    metricsSummary: '60 FPS • 15k Objects • <25ms Latency',
  },
  {
    id: 'dev-lens',
    slug: 'dev-lens',
    title: {
      vi: 'DevLens — Nền Tảng Giám Sát Kỹ Thuật & Phân Tích DORA',
      en: 'DevLens — Engineering Observability & DORA Metrics Suite',
    },
    subtitle: {
      vi: 'Thu thập và phân tích dữ liệu telemetry từ GitHub, Jira, Kubernetes và Datadog nhằm tối ưu hóa chu kỳ phát triển phần mềm.',
      en: 'Aggregating CI/CD, GitHub, and runtime telemetry to compute automated DORA metrics and identify software delivery bottlenecks.',
    },
    category: 'fullstack',
    year: '2023',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'DevLens cung cấp cho các Giám đốc Kỹ thuật (CTO/VPE) bức tranh toàn cảnh về năng suất nhóm kỹ sư thông qua 4 chỉ số DORA tiêu chuẩn (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service).',
      en: 'DevLens provides engineering leadership with holistic visibility into development velocity via standard DORA metrics, pulling from GitHub, Jira, and Kubernetes audit logs.',
    },
    problem: {
      vi: 'Công ty quy mô 120+ kỹ sư bị phân mảnh thông tin, chu kỳ release kéo dài 3 tuần mà không rõ lý do tắc nghẽn ở khâu nào trong quy trình.',
      en: 'With 120+ software engineers across 14 squads, release cycles dragged to 3 weeks with no centralized telemetry to pinpoint pipeline bottlenecks.',
    },
    solution: {
      vi: 'Xây dựng pipeline thu thập webhook thời gian thực với ClickHouse làm cơ sở dữ liệu OLAP phân tích tốc độ cao, hiển thị báo cáo trực quan với biểu đồ tương tác Recharts.',
      en: 'Constructed an event-driven webhook pipeline leveraging ClickHouse for sub-second analytical aggregations, visualized through an interactive Recharts React dashboard.',
    },
    myRole: {
      vi: 'Full-Stack Developer: Xây dựng backend ingestion workers, thiết kế data models trên ClickHouse và phát triển toàn bộ UI/UX dashboard.',
      en: 'Full-Stack Developer: Built backend ingestion workers, designed ClickHouse analytical schemas, and engineered the high-density React dashboard interface.',
    },
    results: [
      { metric: '3 tuần → 2 ngày', label: { vi: 'Rút ngắn Lead Time for Changes', en: 'Lead Time for Changes' } },
      { metric: '5.2x', label: { vi: 'Tăng tần suất Deploy', en: 'Deployment Frequency Gain' } },
      { metric: '< 200ms', label: { vi: 'Thời gian query 50 triệu records', en: '50M Records Query Latency' } },
      { metric: '100%', label: { vi: 'Độ phủ 14 engineering squads', en: 'Squads Active Adoption' } },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'ClickHouse', 'Tailwind CSS', 'Docker', 'REST API'],
    demoUrl: 'https://devlens-demo.example.com',
    githubUrl: 'https://github.com/hoangtuphowall/devlens-analytics',
    metricsSummary: 'Lead Time: 3wks → 2days • 5.2x Deploy Frequency',
  },
  {
    id: 'ai-doc-pilot',
    slug: 'ai-doc-pilot',
    title: {
      vi: 'DocuSense AI — Nền Tảng Trích Xuất Tài Liệu Thông Minh',
      en: 'DocuSense AI — Intelligent Multi-Modal Document RAG Pipeline',
    },
    subtitle: {
      vi: 'Hệ thống RAG cấp doanh nghiệp tự động bóc tách hợp đồng pháp lý, đối chiếu bảng biểu và trả lời câu hỏi nghiệp vụ chính xác.',
      en: 'Enterprise-grade RAG pipeline parsing complex multi-page financial contracts and tabular data with semantic verification.',
    },
    category: 'ai',
    year: '2024',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'DocuSense AI kết hợp mô hình ngôn ngữ lớn (LLM) với cơ sở dữ liệu vector để hỗ trợ bộ phận pháp lý và kiểm toán tra cứu hàng nghìn tài liệu PDF phức tạp chỉ trong vài giây.',
      en: 'DocuSense AI combines Large Language Models with vector databases to assist corporate legal and audit teams in analyzing thousands of complex PDF files.',
    },
    problem: {
      vi: 'Nhân sự pháp chế mất trung bình 4 giờ để đọc đối soát một hợp đồng mua sắm 80 trang, dễ bỏ sót các điều khoản rủi ro tiềm ẩn.',
      en: 'Legal analysts spent 4 hours on average auditing an 80-page corporate contract, risking human oversight on non-standard indemnity clauses.',
    },
    solution: {
      vi: 'Xây dựng Hybrid Retrieval (BM25 + Dense Vector Embeddings với Pinecone), kết hợp Re-ranking và streaming UI phản hồi từng token tức thì.',
      en: 'Engineered a Hybrid Retrieval pipeline (BM25 + Pinecone Dense Vectors) coupled with Cohere re-ranking and a streaming SSE token React UI.',
    },
    myRole: {
      vi: 'Lead Full-Stack & AI Integration Engineer: Thiết kế luồng chunking thông minh cho bảng biểu, xây dựng streaming frontend và API gateway.',
      en: 'Lead Full-Stack & AI Integration Engineer: Designed recursive tabular chunking strategies, built the streaming frontend interface, and secured internal APIs.',
    },
    results: [
      { metric: '94%', label: { vi: 'Tiết kiệm thời gian rà soát', en: 'Audit Time Saved' } },
      { metric: '99.2%', label: { vi: 'Độ chính xác trích xuất', en: 'Extraction Accuracy' } },
      { metric: '< 1.2s', label: { vi: 'Thời gian trả lời câu hỏi', en: 'Avg Query Response Time' } },
      { metric: '500k+', label: { vi: 'Trang tài liệu đã xử lý', en: 'Pages Processed' } },
    ],
    techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Pinecone', 'Claude API', 'Docker'],
    demoUrl: 'https://docusense-ai.example.com',
    githubUrl: 'https://github.com/hoangtuphowall/docusense-rag-pipeline',
    metricsSummary: '94% Time Saved • 99.2% Accuracy • <1.2s Latency',
  },
  {
    id: 'zero-core-ui',
    slug: 'zero-core-ui',
    title: {
      vi: 'ZeroCore UI — Design System Nhẹ & Chuẩn Accessibility',
      en: 'ZeroCore UI — High-Performance Accessible Design System',
    },
    subtitle: {
      vi: 'Bộ component mã nguồn mở chuẩn WCAG 2.1 AAA với bundle size siêu nhỏ (<12KB gzipped) và 50k+ lượt tải hàng tuần.',
      en: 'Open-source WCAG 2.1 AAA design component library with zero runtime overhead (<12KB gzipped) and 50k+ weekly npm downloads.',
    },
    category: 'frontend',
    year: '2023',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    ],
    overview: {
      vi: 'Thư viện UI components tối ưu hiệu năng dành cho các sản phẩm SaaS cần tốc độ cao, hỗ trợ bàn phím 100%, tích hợp Tailwind CSS và tương thích React 18/19.',
      en: 'Performance-obsessed React component library for enterprise SaaS web applications, ensuring full keyboard a11y, strict typing, and tiny bundle size.',
    },
    problem: {
      vi: 'Nhiều UI library phổ biến có bundle size cồng kềnh (150KB+), làm giảm điểm Core Web Vitals và thiếu tính linh hoạt khi tùy biến CSS.',
      en: 'Popular UI libraries import excessive runtime dependencies (150KB+), degrading initial page hydration and complicating design customization.',
    },
    solution: {
      vi: 'Thiết kế hệ thống headless components không phụ thuộc styling runtime, tận dụng CSS variables thuần và tối ưu hóa tree-shaking tối đa.',
      en: 'Crafted headless unstyled primitives utilizing native CSS variables, modular exports for perfect tree-shaking, and automated a11y testing suites.',
    },
    myRole: {
      vi: 'Creator & Lead Maintainer: Lập trình toàn bộ components, viết tài liệu tương tác với Storybook và quản lý open source community.',
      en: 'Creator & Lead Maintainer: Authored core component primitives, wrote comprehensive Storybook interactive documentation, and managed npm releases.',
    },
    results: [
      { metric: '50k+', label: { vi: 'Lượt tải mỗi tuần trên npm', en: 'Weekly npm Downloads' } },
      { metric: '< 12KB', label: { vi: 'Kích thước bundle gzipped', en: 'Total Gzipped Bundle' } },
      { metric: '100%', label: { vi: 'Tuân thủ tiêu chuẩn a11y', en: 'WCAG AAA Compliance' } },
      { metric: '1.4k ⭐', label: { vi: 'GitHub Stars', en: 'GitHub Stars' } },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest', 'NPM Packaging'],
    demoUrl: 'https://zerocore-ui.dev',
    githubUrl: 'https://github.com/hoangtuphowall/zerocore-ui',
    metricsSummary: '50k+ Weekly Downloads • <12KB • 1.4k Stars',
  },
];

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: {
      vi: 'Full-Stack Developer',
      en: 'Full-Stack Developer',
    },
    company: 'FPT Software',
    location: 'Ho Chi Minh City, Vietnam (Hybrid)',
    period: '2022 — Hiện tại (Present)',
    type: 'full-time',
    description: {
      vi: 'Chịu trách nhiệm kiến trúc nền tảng thanh toán lõi, quản lý trực tiếp nhóm 8 kỹ sư full-stack và cố vấn các tiêu chuẩn bảo mật PCI-DSS.',
      en: 'Leading core payment gateway architecture, managing an 8-engineer full-stack team, and enforcing PCI-DSS security compliance across all services.',
    },
    achievements: {
      vi: [
        'Dẫn dắt tái cấu trúc hệ thống từ monolithic sang event-driven microservices với Go, Kafka và PostgreSQL, giúp hệ thống chịu tải tăng từ 2k lên 12k TPS.',
        'Giảm độ trễ p99 từ 180ms xuống 48ms nhờ cơ chế multi-layer caching với Redis và connection pooling thông minh.',
        'Thiết kế giải pháp Idempotency phân tán, loại bỏ 100% tình trạng duplicate charge trong các đợt cao điểm khuyến mãi.',
        'Xây dựng quy chuẩn kiểm thử tự động (TDD) và CI/CD pipeline, rút ngắn thời gian release từ 2 tuần xuống còn 3 ngày.',
      ],
      en: [
        'Led migration from legacy monolith to event-driven Go/Kafka microservices, scaling capacity from 2k to 12.5k TPS.',
        'Reduced p99 gateway latency from 180ms to 48ms through Redis multi-tier caching and optimized database connection pooling.',
        'Architected distributed idempotency system, eliminating 100% duplicate transaction errors during peak promotions.',
        'Introduced automated TDD standards and GitHub Actions CI/CD pipelines, cutting release intervals from 2 weeks to 3 days.',
      ],
    },
    techStack: ['Go', 'Node.js', 'React', 'TypeScript', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS'],
  },
  {
    id: 'exp-2',
    role: {
      vi: 'Senior Full-Stack Engineer',
      en: 'Senior Full-Stack Engineer',
    },
    company: 'Apex Global Commerce',
    location: 'Singapore (Remote)',
    period: '2020 — 2022',
    type: 'full-time',
    description: {
      vi: 'Phát triển nền tảng thương mại điện tử phục vụ thị trường Đông Nam Á với hơn 4 triệu người dùng hoạt động mỗi tháng.',
      en: 'Engineered high-scale e-commerce storefronts and order management services serving 4M+ monthly active shoppers across Southeast Asia.',
    },
    achievements: {
      vi: [
        'Chuyển đổi giao diện sang Next.js App Router kết hợp Incremental Static Regeneration, tăng điểm Core Web Vitals lên 98/100.',
        'Tối ưu hóa các truy vấn cơ sở dữ liệu PostgreSQL chậm, cải thiện thời gian tải trang danh mục sản phẩm nhanh hơn 65%.',
        'Tích hợp đa cổng thanh toán (Stripe, PayPal, Momo) và hệ thống webhooks với cơ chế tự động retry theo exponential backoff.',
      ],
      en: [
        'Rebuilt storefront with Next.js App Router and ISR, elevating Google Core Web Vitals to a sustained 98/100.',
        'Optimized heavy PostgreSQL queries and composite indexing, accelerating product catalog response times by 65%.',
        'Integrated global payment gateways (Stripe, PayPal, Momo) with resilient exponential backoff webhook processors.',
      ],
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'GCP'],
  },
  {
    id: 'exp-3',
    role: {
      vi: 'Full-Stack Software Engineer',
      en: 'Full-Stack Software Engineer',
    },
    company: 'CloudFlow Tech Solutions',
    location: 'Ho Chi Minh City, Vietnam',
    period: '2018 — 2020',
    type: 'full-time',
    description: {
      vi: 'Xây dựng các sản phẩm SaaS B2B quản lý nhân sự và quy trình làm việc doanh nghiệp.',
      en: 'Developed enterprise B2B SaaS solutions for automated workforce management and collaborative team workflows.',
    },
    achievements: {
      vi: [
        'Xây dựng các dashboard tương tác thời gian thực với React và WebSockets phục vụ hơn 50,000 nhân viên doanh nghiệp.',
        'Thiết kế hệ thống phân quyền đa cấp độ (Role-Based Access Control - RBAC) bảo mật chuẩn enterprise.',
        'Viết bộ component UI nội bộ tái sử dụng cho 6 dự án khác nhau của công ty.',
      ],
      en: [
        'Engineered real-time reactive dashboards with React and WebSockets supporting 50,000+ enterprise corporate users.',
        'Designed granular multi-tenant Role-Based Access Control (RBAC) security frameworks.',
        'Authored reusable internal React component UI kit adopted across 6 cross-functional company products.',
      ],
    },
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
  },
];

export const educationData: Education[] = [
  {
    id: 'edu-1',
    degree: {
      vi: 'Cử Nhân Khoa Học Máy Tính (B.S. in Computer Science)',
      en: 'Bachelor of Science in Computer Science',
    },
    institution: 'Đại Học Bách Khoa TP.HCM (HCMUT)',
    period: '2014 — 2018',
    details: {
      vi: 'Tốt nghiệp Chương trình Kỹ sư Tài năng, chuyên ngành Hệ thống Thông tin & Mạng Máy Tính. Đạt học bổng Khuyến khích Tài năng 3 năm liên tiếp.',
      en: 'Honors Program Graduate, specialized in Information Systems & Distributed Computing. Top 5% academic honor roll for 3 consecutive years.',
    },
    gpa: '3.75 / 4.0 (Top 5%)',
  },
  {
    id: 'edu-2',
    degree: {
      vi: 'Chứng chỉ Chuyên môn Quốc tế (Professional Certifications)',
      en: 'Professional Cloud & Engineering Certifications',
    },
    institution: 'Amazon Web Services & CNCF',
    period: '2021 — 2024',
    details: {
      vi: '• AWS Certified Solutions Architect – Associate\n• Certified Kubernetes Application Developer (CKAD)\n• Meta Certified Front-End Developer',
      en: '• AWS Certified Solutions Architect – Associate\n• Certified Kubernetes Application Developer (CKAD)\n• Meta Certified Front-End Developer',
    },
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'optimizing-react-rendering-at-scale',
    title: {
      vi: 'Tối ưu hóa hiệu năng React ở quy mô triệu người dùng: Tránh re-renders thừa & Virtual DOM bottlenecks',
      en: 'Optimizing React Performance at Scale: Eliminating Unwanted Re-Renders & Virtual DOM Bottlenecks',
    },
    summary: {
      vi: 'Phân tích cơ chế reconciliation nội bộ của React 19/18, các sai lầm phổ biến khi dùng memo/useCallback và chiến lược kiến trúc state phân tán giúp duy trì 60 FPS.',
      en: 'A deep dive into React reconciliation internals, common pitfalls with memo/useCallback, and localized state architecture strategies to guarantee smooth 60 FPS.',
    },
    publishedAt: '2024-03-15',
    readingTime: '8',
    tags: ['React', 'Performance', 'JavaScript', 'Frontend Architecture'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    content: {
      vi: {
        intro: 'Trong các ứng dụng React lớn, việc giao diện bị lag hoặc khựng khung hình (dropped frames) hầu hết không đến từ thuật toán phức tạp, mà xuất phát từ việc hàng trăm component con re-render không cần thiết mỗi khi root state thay đổi. Bài viết này tổng hợp những kinh nghiệm thực chiến giúp bạn tối ưu hóa từ gốc rễ.',
        sections: [
          {
            heading: '1. Hiểu đúng về cơ chế Reconciliation và Virtual DOM',
            body: 'Nhiều lập trình viên lầm tưởng rằng Virtual DOM có tốc độ tương đương native DOM operations. Thực tế, Virtual DOM là một lớp trừu tượng giúp ta viết code khai báo (declarative), nhưng nó vẫn tiêu tốn CPU cycles để diff 2 cây object. Khi cây component sâu 15 tầng và chứa hàng nghìn nodes, việc diff liên tục trên main thread sẽ chặn event loop khiến người dùng cảm nhận độ trễ rõ rệt.',
            codeSnippet: {
              language: 'tsx',
              code: `// ❌ SAI LẦM PHỔ BIẾN: Đặt object literal làm prop dẫn đến tạo reference mới mỗi render
function HeavyList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* HeavyComponent sẽ re-render dù data không đổi vì styles object luôn là reference mới */}
      <HeavyComponent data={items} config={{ animate: true, theme: 'dark' }} />
    </div>
  );
}

// ✅ CẢI TIẾN: Di chuyển config ra ngoài hoặc memoize, tách component state nhỏ
const DEFAULT_CONFIG = { animate: true, theme: 'dark' } as const;

function OptimizedList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyComponent data={items} config={DEFAULT_CONFIG} />
    </div>
  );
}`,
            },
          },
          {
            heading: '2. Kỹ thuật Push State Down (Đẩy State Xuống Thấp Nhất Có Thể)',
            body: 'Thay vì lạm dụng useMemo hoặc React.memo trên khắp codebase, giải pháp kiến trúc đơn giản nhất là đẩy state xuống component nhỏ nhất thực sự cần nó. Khi state nằm gọn trong leaf node, toàn bộ cây cha và các anh em xung quanh hoàn toàn không bị ảnh hưởng.',
            codeSnippet: {
              language: 'tsx',
              code: `// Thay vì để state trong container lớn:
export function Dashboard() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <ExpensiveMetricsGraph />
        {/* Tách phần search có state riêng thành component độc lập */}
        <IsolatedSearchWidget onSelect={handleSelect} />
      </div>
      <Sidebar />
    </div>
  );
}`,
            },
          },
          {
            heading: '3. Tận dụng React 19 useTransition cho tác vụ nặng',
            body: 'Với Concurrent Mode, ta có thể đánh dấu các cập nhật không khẩn cấp (như lọc danh sách 10,000 bản ghi) bằng startTransition. Điều này giúp input gõ phím của người dùng luôn đạt 60 FPS phản hồi tức thì mà không bị đơ trình duyệt.',
          },
        ],
        conclusion: 'Tối ưu hiệu năng là một quá trình liên tục dựa trên số liệu profiling từ React DevTools Profiler và Chrome Performance Tab. Đừng đoán mò — hãy đo đạc trước và sau khi refactor!',
      },
      en: {
        intro: 'In massive enterprise React applications, UI stuttering and dropped frames are seldom caused by heavy algorithmic computations. Instead, they stem from cascading re-renders across hundreds of child components whenever root state shifts. Here are battle-tested strategies to eliminate rendering bottlenecks.',
        sections: [
          {
            heading: '1. Deconstructing Virtual DOM Reconciliation',
            body: 'Virtual DOM is not free. Creating and diffing large JavaScript object trees on every user keystroke consumes precious main-thread time budget, causing input lag and jank.',
            codeSnippet: {
              language: 'tsx',
              code: `// Avoid inline object props that break referential equality
const STATIC_CONFIG = { smoothScroll: true } as const;

export function TableWrapper({ rows }: { rows: RowData[] }) {
  return <HeavyTable data={rows} options={STATIC_CONFIG} />;
}`,
            },
          },
          {
            heading: '2. Pushing State Down Architecture',
            body: 'Before reaching for React.memo or complex selector memoization, simply push state down to the lowest feasible leaf component in your hierarchy.',
          },
          {
            heading: '3. Prioritizing Inputs with React Transitions',
            body: 'Leverage useTransition to separate urgent updates (typing in a search bar) from non-urgent state transitions (re-sorting a 10,000-row table).',
          },
        ],
        conclusion: 'Always verify rendering optimizations using React Profiler flamegraphs rather than intuition.',
      },
    },
  },
  {
    id: 'post-2',
    slug: 'zero-downtime-migration-monolith-to-microservices',
    title: {
      vi: 'Chiến lược Zero-Downtime Migration từ Monolith sang Event-Driven Microservices với Kafka & Postgres',
      en: 'Zero-Downtime Migration from Monolith to Event-Driven Microservices with Kafka & PostgreSQL',
    },
    summary: {
      vi: 'Cách chúng tôi di chuyển dữ liệu giao dịch 50 triệu records sang kiến trúc mới mà không làm gián đoạn người dùng: Áp dụng Strangler Fig Pattern và Change Data Capture (CDC).',
      en: 'How we migrated 50M financial transaction records to a decoupled event-driven architecture with zero customer interruption using the Strangler Fig pattern and CDC.',
    },
    publishedAt: '2024-01-20',
    readingTime: '11',
    tags: ['Microservices', 'Kafka', 'PostgreSQL', 'Architecture', 'System Design'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    content: {
      vi: {
        intro: 'Chuyển đổi một hệ thống monolithic đang phục vụ hàng triệu giao dịch mỗi ngày sang microservices thường được ví như việc thay động cơ phản lực khi máy bay đang bay ở độ cao 10,000 mét. Bài viết chia sẻ từng bước thực thi an toàn.',
        sections: [
          {
            heading: '1. Tại sao không bao giờ nên "Big Bang Rewrite"?',
            body: 'Viết lại toàn bộ hệ thống từ đầu (Big Bang) là nguyên nhân hàng đầu khiến các dự án kỹ thuật thất bại: kéo dài thời gian phát triển, logic nghiệp vụ cũ bị sót, và rủi ro sập toàn bộ khi switch-over.',
          },
          {
            heading: '2. Áp dụng Strangler Fig Pattern và Dual-Writing',
            body: 'Từng domain nghiệp vụ nhỏ (ví dụ: Service thanh toán, Service thông báo) được bóc tách dần dần. Trong giai đoạn chuyển tiếp, ta sử dụng reverse proxy (Nginx / Cloudflare Worker) để định tuyến một phần nhỏ traffic (canary release 5% -> 20% -> 100%).',
            codeSnippet: {
              language: 'sql',
              code: `-- Sử dụng Outbox Pattern để bảo đảm tính Atomic giữa DB Transaction và Kafka Event
BEGIN;
  -- 1. Cập nhật số dư tài khoản
  UPDATE accounts SET balance = balance - 100 WHERE id = 'acc_123';
  
  -- 2. Ghi bản ghi vào bảng Outbox trong cùng 1 database transaction
  INSERT INTO outbox_events (aggregate_type, event_type, payload)
  VALUES ('PAYMENT', 'PAYMENT_COMPLETED', '{"accountId": "acc_123", "amount": 100}');
COMMIT;`,
            },
          },
          {
            heading: '3. Đồng bộ dữ liệu liên tục với Debezium Change Data Capture (CDC)',
            body: 'Thay vì dùng ứng dụng để gửi event lên Kafka (dễ bị fail nếu mạng rớt giữa chừng), công cụ CDC đọc trực tiếp Postgres WAL (Write-Ahead Log) và stream các thay đổi sang Kafka topic theo thời gian thực.',
          },
        ],
        conclusion: 'Sự kiên nhẫn và chiến lược fallback rõ ràng là chìa khóa để hoàn thành cuộc di chuyển thành công mà không làm mất bất kỳ giao dịch nào của người dùng.',
      },
      en: {
        intro: 'Rewriting a monolith while maintaining millions of daily active operations is equivalent to swapping an airplane engine mid-flight. Here is our exact blueprint.',
        sections: [
          {
            heading: '1. The Danger of Big Bang Rewrites',
            body: 'Incremental domain extraction using the Strangler Fig pattern minimizes systemic blast radius.',
          },
          {
            heading: '2. Transactional Outbox Pattern',
            body: 'Guaranteeing consistency between relational database transactions and published Kafka events.',
          },
        ],
        conclusion: 'Measure twice, migrate gradually with feature flags, and automate your reconciliation scripts.',
      },
    },
  },
  {
    id: 'post-3',
    slug: 'system-design-idempotent-payment-engine',
    title: {
      vi: 'Thiết kế kiến trúc hệ thống xử lý thanh toán Idempotent chống duplicate charges',
      en: 'System Design: Architecting an Idempotent Payment Engine to Prevent Duplicate Charges',
    },
    summary: {
      vi: 'Hướng dẫn chi tiết từ lý thuyết đến code thực tế về Idempotency Keys, cơ chế phân tán Redlock, token bucket rate limiting và xử lý retry an toàn.',
      en: 'A comprehensive engineering guide from mathematical concepts to production code on Idempotency Keys, Redlock consensus, and safe network retry semantics.',
    },
    publishedAt: '2023-11-08',
    readingTime: '9',
    tags: ['System Design', 'FinTech', 'Redis', 'Backend', 'Security'],
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    content: {
      vi: {
        intro: 'Trong mạng máy tính, timeout không có nghĩa là giao dịch thất bại — có thể yêu cầu đã tới server và thanh toán đã thành công, nhưng gói tin phản hồi bị drop trên đường truyền. Nếu client retry mù quáng, tài khoản người dùng sẽ bị trừ tiền hai lần.',
        sections: [
          {
            heading: '1. Định nghĩa chuẩn về Tính Idempotent (Idempotency)',
            body: 'Một thao tác f(x) được gọi là idempotent nếu f(f(x)) = f(x). Nghĩa là dù client gửi cùng một yêu cầu thanh toán 1 lần hay 10 lần, kết quả trừ tiền và số dư tài khoản chỉ thay đổi đúng một lần duy nhất.',
          },
          {
            heading: '2. Cấu trúc của Idempotency Key',
            body: 'Client bắt buộc phải đính kèm header Idempotency-Key (thường là UUID v4). Server sử dụng Redis với lệnh SET key value NX EX để atomic lock yêu cầu.',
            codeSnippet: {
              language: 'ts',
              code: `// Middleware kiểm tra Idempotency với Redis
export async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) return res.status(400).json({ error: 'Missing Idempotency-Key header' });

  const redisKey = \`idempotency:\${key}\`;
  // SET NX (Not Exists) với TTL 120 giây
  const acquired = await redis.set(redisKey, 'PROCESSING', 'NX', 'EX', 120);

  if (!acquired) {
    const existing = await redis.get(redisKey);
    if (existing === 'PROCESSING') {
      return res.status(409).json({ error: 'Giao dịch đang được xử lý, vui lòng không gửi lại!' });
    }
    // Trả về kết quả đã cache từ lần gửi trước mà không tính tiền lại
    return res.status(200).json(JSON.parse(existing));
  }

  // Hook vào res.json để lưu cache kết quả khi xử lý xong
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    redis.set(redisKey, JSON.stringify(data), 'EX', 86400); // Lưu 24h
    return originalJson(data);
  };

  next();
}`,
            },
          },
          {
            heading: '3. Quản lý trạng thái và Deadlock',
            body: 'Cần có TTL hợp lý cho khóa tạm thời và xử lý graceful degradation khi Redis gặp sự cố ngắn hạn.',
          },
        ],
        conclusion: 'Nguyên lý Idempotency là nền tảng sống còn của mọi hệ thống tài chính thương mại điện tử hiện đại.',
      },
      en: {
        intro: 'In network programming, timeouts do not imply failure. The packet could have succeeded on the server while the ACK was dropped. Idempotency guarantees safe retries without double charges.',
        sections: [
          {
            heading: '1. Mathematical Definition of Idempotence',
            body: 'Executing an operation multiple times produces the exact same side-effects as executing it once.',
          },
          {
            heading: '2. Atomic Redis SET NX Implementation',
            body: 'Enforcing single-flight execution using distributed locks keyed by unique client UUIDs.',
          },
        ],
        conclusion: 'Idempotency must be designed into your API contracts from day zero.',
      },
    },
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    name: 'David Thorne',
    role: 'VP of Engineering',
    company: 'FinScale Solutions Inc.',
    avatar: '/testimonial-david-thorne.png',
    content: {
      vi: 'Huy là một trong những Senior Engineer xuất sắc nhất mà tôi từng làm việc cùng. Khả năng tư duy kiến trúc phân tán và sự nhạy bén trong việc giải quyết các bài toán tải cao của anh ấy đã cứu nền tảng thanh toán của chúng tôi trong đợt Black Friday vừa qua.',
      en: 'Huy is easily one of the most capable Senior Engineers I have collaborated with. His distributed systems intuition and performance optimization mindset single-handedly secured our payment platform during Black Friday peak volumes.',
    },
    linkedin: 'https://linkedin.com',
  },
  {
    id: 't-2',
    name: 'Sarah Chen',
    role: 'Lead Architect',
    company: 'Apex Global Commerce',
    avatar: '/testimonial-sarah-chen.png',
    content: {
      vi: 'Sự am hiểu sâu sắc của Huy về cả frontend performance (React, Core Web Vitals) lẫn backend scalability (Kafka, Postgres tuning) là một lợi thế hiếm có. Anh ấy luôn đặt chất lượng code và trải nghiệm người dùng lên trên hết.',
      en: 'Huy bridges the gap between deep frontend rendering mastery and high-scale distributed backend systems effortlessly. His dedication to clean code standards and mentorship elevated our entire team.',
    },
    linkedin: 'https://linkedin.com',
  },
  {
    id: 't-3',
    name: 'Trần Minh Tuấn',
    role: 'Co-Founder & CTO',
    company: 'Nexus Tech Lab',
    avatar: '/testimonial-tran-minh-tuan.png',
    content: {
      vi: 'Làm việc cùng Huy luôn mang lại sự yên tâm tuyệt đối. Mọi cam kết về deadline, bảo mật hay SLA hệ thống đều được anh ấy hiện thực hóa một cách bài bản, rõ ràng và có số liệu minh chứng cụ thể.',
      en: 'Collaborating with Huy gives leadership immense peace of mind. Every architectural commitment, SLA guarantee, and deadline is delivered with engineering precision and verifiable metrics.',
    },
    linkedin: 'https://linkedin.com',
  },
];

// lib/projects.ts

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  link?: string;
  demoUrl?: string;
  githubUrl?: string;
  images: string[];
  year: number;
  category: "opensource" | "product" | "ai" | "fintech" | "health";
}

export const MY_PROJECTS: Project[] = [
  {
    id: "gsoc-wikimedia",
    slug: "gsoc-wikimedia",
    title: "GSoC Wikimedia Contribution",
    description: "A full-stack campaign wizard & visual editor for Wikimedia. React PoC migration, Go backend, campaign analytics dashboard.",
    longDescription: "During my Google Summer of Code 2026, I led the architectural migration of the legacy Wikimedia Campaign Wizard to a modern, decoupled React frontend and high-performance Go backend. I engineered a robust analytics dashboard tracking campaign metadata and engineered an interactive visual editor allowing organizers to preview structural Wiki changes in real-time. This open-source contribution significantly optimized the onboarding funnel for new Wikimedia campaign organizers globally.",
    tech: ["React", "Go", "MediaWiki", "TypeScript", "Tailwind CSS"],
    category: "opensource",
    year: 2026,
    githubUrl: "https://github.com/only-vikas/campwiz",
    demoUrl: "https://meta.wikimedia.org",
    images: ["/images/projects/wikimedia-1.webp", "/images/projects/wikimedia-2.webp"]
  },
  {
    id: "forgefit",
    slug: "forgefit",
    title: "ForgeFit",
    description: "A cinematic fitness operating system with 3D workout visualizations, progress tracking, and AI-powered routines.",
    longDescription: "ForgeFit reimagines the standard fitness application as a premium, cinematic 'operating system'. Users are greeted with an immersive 3D interface built in Three.js and GSAP, allowing manipulation of human biomechanical models to target specific muscle groups. The backend integrates an AI-routing engine to construct personalized hybrid workout protocols mapping exactly to an athlete's biometrics and progression.",
    tech: ["Three.js", "GSAP", "Next.js", "AI", "Framer Motion"],
    category: "product",
    year: 2025,
    githubUrl: "https://github.com/only-vikas/forgefit",
    demoUrl: "https://forgefit-live.vercel.app",
    images: ["/images/projects/forgefit-1.webp", "/images/projects/forgefit-2.webp"]
  },
  {
    id: "financial-os",
    slug: "financial-os",
    title: "Financial OS",
    description: "High-fidelity fintech dashboard with real-time market data, expense management, and investment tracking.",
    longDescription: "Engineered specifically for power users, Financial OS is a comprehensive terminal environment nested directly in the browser. It aggregates live market websocket streams alongside personal banking feeds, parsing massive datasets into interactive, highly responsive, zero-lag charting libraries. It serves as my personal control center for executing trades, balancing portfolios, and running algorithmic market queries.",
    tech: ["React", "TypeScript", "Recharts", "WebSockets"],
    category: "fintech",
    year: 2025,
    githubUrl: "https://github.com/only-vikas/financial-os",
    images: ["/images/projects/fintech-1.webp", "/images/projects/fintech-2.webp"]
  },
  {
    id: "tracksaveinvest",
    slug: "tracksaveinvest",
    title: "TrackSaveInvest",
    description: "Intelligent personal finance tracker with budgeting, saving goals, and investment insights.",
    longDescription: "TrackSaveInvest began as a lightweight expense logger and evolved into an intelligent portfolio sidekick. Leveraging robust MongoDB aggregations, the platform algorithmically tracks consumer spending velocity, auto-classifies transactions, and issues real-time alerts if saving goals fall off-trajectory. It also includes an authentication layer ensuring critical financial data remains encrypted and isolated.",
    tech: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    category: "fintech",
    year: 2024,
    githubUrl: "https://github.com/only-vikas/track-save-invest",
    images: ["/images/projects/tsi-1.webp"]
  },
  {
    id: "caresync",
    slug: "caresync",
    title: "CareSync",
    description: "Healthcare appointment system with scheduling and patient management.",
    longDescription: "CareSync solves the fragmented onboarding process of independent medical clinics. The platform digitizes the complete waiting room experience—offering real-time schedule conflict resolution, automated SMS patient reminders, and a secure provider dashboard. Built on a strict architectural paradigm, the application manages multi-tenant databases directly on PostgreSQL for lightning-fast reads and scaling capability.",
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    category: "health",
    year: 2024,
    githubUrl: "https://github.com/only-vikas/caresync",
    images: ["/images/projects/caresync-1.webp"]
  },
  {
    id: "youtube-notes",
    slug: "youtube-notes",
    title: "YouTube → Notes",
    description: "Converts YouTube videos into structured, readable study notes using AI.",
    longDescription: "An AI-powered extraction pipeline built to defeat hours of endless video consumption. By hooking into the YouTube transcription API and processing raw captions through a custom LLM prompt chain, this tool dynamically summarizes hour-long lectures into perfectly formatted, markdown-ready study notes in under 15 seconds. It handles long-context chunking and semantic preservation out of the box.",
    tech: ["Python", "FastAPI", "OpenAI API", "React"],
    category: "ai",
    year: 2025,
    githubUrl: "https://github.com/only-vikas/youtube-ai-notes",
    demoUrl: "https://youtubenotes.vercel.app",
    images: ["/images/projects/youtube-1.webp"]
  },
  {
    id: "crypto-password",
    slug: "crypto-password",
    title: "Crypto + Password",
    description: "Crypto tracker with encrypted password manager and real-time alerts.",
    longDescription: "A dual-purpose utility designed for supreme privacy and hyper-vigilance. This project fuses an offline-first encrypted password vault alongside a volatile-market crypto tracking daemon. It utilizes AES-256 GCM client-side encryption entirely in browser memory to guarantee credentials are never exposed, all while silently parsing background ticks from public market APIs to issue severe threshold notifications.",
    tech: ["React", "WebCrypto API", "Zustand", "Redis"],
    category: "product",
    year: 2023,
    githubUrl: "https://github.com/only-vikas/crypto-vault",
    images: ["/images/projects/cryptovault-1.webp"]
  },
];

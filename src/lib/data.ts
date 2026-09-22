export type ProjectLayer = {
  label: string;
  nodes: string[];
};

export type Project = {
  slug: string;
  name: string;
  cat: string;
  cats: string[];
  year: string;
  ratio: string;
  desc: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  layers: ProjectLayer[];
  outcomes: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo: string;
  linkedin?: string;
  github?: string;
};

/** Studio socials (footer) — Fragment company */
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/fragment-studio",
  whatsapp: "https://wa.me/923200906066",
} as const;

export type Service = {
  num: string;
  title: string;
  desc: string;
};

export type ServiceDetail = {
  num: string;
  title: string;
  lead: string;
  items: string[];
};

export type Step = {
  num: string;
  title: string;
  desc: string;
};

export type TechNode = {
  id: string;
  label: string;
  col: number;
  sx: number;
  sy: number;
};

export type NavItem = {
  label: string;
  href: string;
};

export const ACCENT_HEX = "#CD5C5C";

export const projects: Project[] = [
  {
    slug: "premedpk",
    name: "PreMed.PK",
    cat: "PRODUCT",
    cats: ["PRODUCT", "AI"],
    year: "2024",
    ratio: "16/10",
    desc: "Pakistan's premed learning platform — later Examora — rebuilt for national-scale practice, lessons, and progress.",
    tech: ["Next.js", "NestJS", "MongoDB", "Qdrant", "React Native"],
    overview:
      "Lead engineer on Pakistan's leading entrance-exam prep platform: a CRA React rebuild into Next.js and NestJS that holds up under national traffic, with a RAG study assistant and store apps. Public base of 100K+ students and around 70M question attempts.",
    problem:
      "A slow Create React App study product duplicated questions per deck and could not survive exam-season load — question screens sat around 20 seconds.",
    solution:
      "Shared question references instead of per-deck copies, CDN images, a sliding-window fetch, Vercel ISR with a Redis-backed notes cache, Qdrant RAG over questions and textbooks, week-by-week topic recommendations, and GCP/AWS ops with Terraform and Ansible. React Native apps shipped with RevenueCat.",
    layers: [
      { label: "CLIENT", nodes: ["Next.js web", "iOS / Android", "Admin"] },
      {
        label: "SERVICES",
        nodes: ["NestJS practice API", "RAG / Qdrant", "Topic recs"],
      },
      { label: "DATA", nodes: ["MongoDB replica", "Redis", "CDN / ISR"] },
    ],
    outcomes: [
      "Question load time from ~20s to ~800ms",
      "100K+ public students, ~70M question attempts",
      "RAG answers grounded with topic and book citations",
      "Apps live on the App Store and Google Play",
    ],
  },
  {
    slug: "ensemble",
    name: "Ensemble.io",
    cat: "DATA",
    cats: ["DATA", "INFRASTRUCTURE", "AI"],
    year: "2025",
    ratio: "4/3",
    desc: "Flux Foundry — industrial spare-parts standardization across plants and ERPs.",
    tech: ["Python", "AWS", "Bedrock", "Terraform"],
    overview:
      "Tenant-scoped Bronze → Silver → Gold ingest for Ensemble's Flux Foundry: raw ERP exports become a canonical, explainable parts graph that engineers can query and trust.",
    problem:
      "Spare-parts records were inconsistent and duplicated across plants and ERPs, so there was no single catalog anyone could stand behind.",
    solution:
      "An event-driven Loader / Processor / Enricher / Matcher on Lambda and SQS. Enrichment V2 uses Bedrock, a DynamoDB cache, AppConfig version pins, and ISO 14224 attributes, with a truth ladder that fails weak rows closed. Gold projects into Aurora and a graph for duplicate and equivalent resolution.",
    layers: [
      { label: "INGEST", nodes: ["AppFlow", "S3 Bronze", "Quarantine"] },
      {
        label: "PIPELINE",
        nodes: ["Lambda / SQS", "Bedrock enrich", "Entity match"],
      },
      {
        label: "SURFACE",
        nodes: ["Aurora / graph", "Foundry Apps", "Reliability"],
      },
    ],
    outcomes: [
      "Canonical, tenant-aware parts graph",
      "Weak rows fail closed instead of hallucinated metadata",
      "ISO 14224-aligned attributes with version pins",
      "Terraform modules and CloudWatch triage for Bedrock and cache",
    ],
  },
  {
    slug: "fairticket",
    name: "Fair Ticket",
    cat: "PRODUCT",
    cats: ["PRODUCT"],
    year: "2024",
    ratio: "16/10",
    desc: "Austrian ticketing marketplace — edge booking, live seatmaps, Stripe Connect, two store apps.",
    tech: ["Next.js", "Cloudflare Workers", "Stripe Connect", "React Native"],
    overview:
      "End-to-end marketplace for independent Austrian organizers: German-language booking on Cloudflare's edge, interactive D3 stadium seatmaps, Stripe Connect vendor payouts, and companion fan and vendor apps.",
    problem:
      "Seat inventory breaks under contention, and vendors need KYC'd payouts after a platform cut — a seat can only be sold once, without a busy-wait lock poller.",
    solution:
      "Hono on Cloudflare Workers with QStash async jobs and R2 media. Adding a seat to a cart schedules a short-lived lock and its own release, so unpaid holds free themselves. D3 seatmaps with zoom and select; Stripe Connect KYC for vendor onboarding.",
    layers: [
      { label: "BUYER", nodes: ["Marketplace", "D3 seatmaps", "Fan app"] },
      {
        label: "CORE",
        nodes: ["Workers booking", "QStash locks", "Stripe Connect"],
      },
      { label: "OPS", nodes: ["Vendor tooling", "Vendor app", "R2 media"] },
    ],
    outcomes: [
      "Contention-safe checkout window without a poller",
      "Stripe Connect payouts with KYC for organizers",
      "Fan and vendor apps on the App Store and Google Play",
    ],
  },
  {
    slug: "hashtagclean",
    name: "Hashtag Clean",
    cat: "SAAS",
    cats: ["PRODUCT", "AUTOMATION"],
    year: "2025",
    ratio: "4/3",
    desc: "Pulse and Hygeia — booking, AI-routed day plans, and capability-gated ops for a UK cleaning company.",
    tech: ["Next.js", "Flask", "Supabase", "n8n"],
    overview:
      "Backends for Pulse (quotes, bookings, AI day planner, Twilio SMS) and Hygeia (invite-only ops with rotating JWTs, ServiceM8 revenue, PeopleHR write-back).",
    problem:
      "Quotes, routes, ServiceM8 invoices, and PeopleHR lived in separate tools, so dispatch and status drifted and someone had to chase both sides by phone.",
    solution:
      "Flask-proxied Pulse APIs with an AI planner that sequences jobs by route, not booking order, plus Twilio heads-up SMS. n8n syncs ServiceM8 and PeopleHR. Hygeia adds httpOnly refresh rotation, reuse detection, and capability roles (MD, Accounts, Ops).",
    layers: [
      { label: "OPS", nodes: ["Quotes / bookings", "AI day planner", "Portal"] },
      { label: "COMMS", nodes: ["Twilio SMS", "n8n workflows", "Digests"] },
      { label: "DATA", nodes: ["Supabase Postgres", "ServiceM8", "PeopleHR"] },
    ],
    outcomes: [
      "Cleaner days sequenced by practical route, including supply pickups",
      "Automated SMS as pickup and arrival windows approach",
      "ServiceM8 and PeopleHR sync that used to be manual",
      "Invite-only Hygeia with rotating refresh tokens",
    ],
  },
  {
    slug: "antematter",
    name: "Antematter",
    cat: "AUTOMATION",
    cats: ["AUTOMATION", "DATA"],
    year: "2025",
    ratio: "16/10",
    desc: "Finance and HR ERP cutover onto ERPNext — data migration, custom workflows, and hardened AWS ops.",
    tech: ["ERPNext", "Python", "AWS EC2", "MariaDB"],
    overview:
      "For a US AI studio's client: mapped chart of accounts, payroll, and employee records onto ERPNext, built custom Frappe doctypes, and ran production on a locked-down EC2 stack.",
    problem:
      "Payroll, employee records, and approvals sat in spreadsheets and legacy tools, with double entry between finance and HR.",
    solution:
      "Custom ERPNext doctypes and server scripts tying invoicing to HR. Validation-gated employee migration so payroll survived cutover. Role-based approval chains matching real sign-off. Bastion-only SSH, automated MariaDB backups, cron reports, and audit-traced migration steps.",
    layers: [
      { label: "MIGRATE", nodes: ["Chart of accounts", "Payroll", "Employees"] },
      { label: "ENGINE", nodes: ["Frappe doctypes", "Approvals", "Cron"] },
      { label: "OPS", nodes: ["EC2", "Nginx", "MariaDB backups"] },
    ],
    outcomes: [
      "Cutover without freezing payroll or HR",
      "Invoicing and HR on one ERPNext model",
      "Hardened AWS deploy with automated backups",
      "Post-cutover support through the first close cycles",
    ],
  },
  {
    slug: "ale",
    name: "Elite Health Care",
    cat: "HEALTHCARE",
    cats: ["PRODUCT", "INFRASTRUCTURE"],
    year: "2025",
    ratio: "4/3",
    desc: "ALE clinical and scheduling product plus AgencySync — EVV, authorizations, and remittance-accurate billing.",
    tech: ["Vue", "React", "Azure", "Service Bus"],
    overview:
      "Homecare operations for Elite Health Care (ALE Technologies): patients, dual-entity scheduling, OASIS forms, and EVV on the Vue product, plus Schedule Manager / AgencySync for authorizations, billing reconciliation, and remittance allocation.",
    problem:
      "Authorizations, EVV clock-ins, and remittance allocation drifted apart, so billing errors showed up after month-end instead of before.",
    solution:
      "Nightly Azure Functions for EVV missed clock-in/out sweeps. Bulk EMR imports (WellSky, ALE) and remittance jobs on Service Bus with retry and dead letters so imports never block the live scheduling API. Daily cron comparing authorization units consumed vs billed.",
    layers: [
      { label: "CLINICAL", nodes: ["Vue SPA", "Scheduler", "OASIS / EVV"] },
      {
        label: "CLOUD",
        nodes: ["Python services", "Azure Functions", "Service Bus"],
      },
      { label: "BILLING", nodes: ["Auth units", "Remittance", "AgencySync"] },
    ],
    outcomes: [
      "EVV gaps flagged before they reach billing",
      "Large imports isolated from the live scheduling API",
      "Daily auth-consumed vs billed reconciliation",
      "AgencySync in production and QA",
    ],
  },
  {
    slug: "examora",
    name: "Examora",
    cat: "PRODUCT",
    cats: ["PRODUCT"],
    year: "2026",
    ratio: "16/10",
    desc: "Later PreMed.PK product line — engineering and medical entrance prep on web and mobile.",
    tech: ["React Native", "Next.js", "NestJS", "RevenueCat"],
    overview:
      "Examora is the later brand of the PreMed.PK platform: the same practice, notes, and progress systems, with store apps and an engineering-entrance track on top of the national medical prep base.",
    problem:
      "Preparation happens in short sessions on a phone, but the original product assumed long desktop study — and the engineering paper needed its own mocks and revision paths.",
    solution:
      "React Native apps with RevenueCat, the rebuilt Next.js / NestJS practice engine, and week-by-week topic recommendations driven by schedule and engagement rather than random content.",
    layers: [
      { label: "APP", nodes: ["Practice", "Mocks", "Revision"] },
      { label: "SERVICES", nodes: ["NestJS API", "Recs", "Subscriptions"] },
      { label: "STORE", nodes: ["App Store", "Play Store", "RevenueCat"] },
    ],
    outcomes: [
      "Store apps shipping as the later PreMed surface",
      "Engineering and medical tracks on one practice engine",
      "Topic recommendations from schedule and engagement",
    ],
  },
  {
    slug: "careercrafter",
    name: "CareerCrafter",
    cat: "AI",
    cats: ["AI", "AUTOMATION"],
    year: "2025",
    ratio: "16/10",
    desc: "Agentic job-apply pipeline — profile to ranked roles to browser agents that submit applications.",
    tech: ["Python", "SQS", "Fargate", "DynamoDB"],
    overview:
      "CareerCrafter (Broomstick.AI) builds a structured candidate profile, ranks roles worth applying to, then runs browser-use agents that log in, solve captchas, fill multi-step forms, and submit — on a fully serverless AWS backend.",
    problem:
      "Applying is a grind of logins, captchas, and role-specific questions. Generic autofill cannot answer them, and a failed selector used to kill the whole run.",
    solution:
      "Resume intake into a knowledge base, interest-ranked queues, SQS fan-out to Fargate workers with 2Captcha and bounded retries. Per-application state in DynamoDB, EventBridge re-scans that skip already-actioned postings, Secrets Manager for site creds, SES batch summaries.",
    layers: [
      { label: "INTAKE", nodes: ["Profile KB", "Ranked recs", "Amplify UI"] },
      { label: "AGENTS", nodes: ["SQS", "Fargate / browser-use", "2Captcha"] },
      { label: "AWS", nodes: ["Lambda", "DynamoDB", "EventBridge / SES"] },
    ],
    outcomes: [
      "Live queued → in progress → submitted / failed state",
      "Failed captchas and stale selectors requeue instead of dying",
      "No duplicate applies on already-actioned postings",
      "Credentials injected at runtime, not baked into images",
    ],
  },
  {
    slug: "shotton-mill",
    name: "Shotton Mill",
    cat: "DATA",
    cats: ["DATA", "AI"],
    year: "2026",
    ratio: "4/3",
    desc: "P&ID to SAP hierarchy — DWG tags classified with CAD rules and Bedrock vision, exported as FLOC workbooks.",
    tech: ["Python", "ezdxf", "Bedrock", "SAP FLOC"],
    overview:
      "Ensemble client engagement at a UK paper and tissue mill: a standalone pipeline that opens AutoCAD P&IDs, classifies tags, assigns functional-location addresses from mill maps, and exports SAP-ready equipment and FLOC workbooks.",
    problem:
      "Every pump, valve, motor, and line has to land in SAP as a strict site → line → process → function → equipment tree. Tags already exist on drawings across Valmet, GOR, and KSD numbering — nobody wants to retype hundreds of them.",
    solution:
      "Orchestrated convert → vision → sheet brief → reconcile → equipment → SAP Excel, with mill standards vendored. Multi-OEM grammars into one hierarchy. A vision lane crops each tag, classifies subtypes against the mill legend, and feeds SAP description (EQKTX) rules. FLOC from tag-prefix mill maps, not drawing titles.",
    layers: [
      { label: "CAD", nodes: ["DWG parse", "Valmet / GOR / KSD"] },
      { label: "VISION", nodes: ["Tag crop", "Bedrock classify", "Legend"] },
      { label: "SAP", nodes: ["FLOC tree", "Excel export", "Reasoning audit"] },
    ],
    outcomes: [
      "~89% function find and ~88% sub-process placement on Broke System",
      "~70% equipment tag find; parent attachment still the hard residual",
      "Loadable SAP sheets with POSNR, EQART, work centre, EQKTX",
    ],
  },
];

/** Featured work: scale, ops SaaS, industrial data, agents, marketplace */
export const FEATURED_SLUGS = [
  "premedpk",
  "hashtagclean",
  "ensemble",
  "careercrafter",
  "fairticket",
] as const;

export const team: TeamMember[] = [
  {
    name: "Salis Salman",
    role: "Founder · Principal Engineer",
    bio: "Sets the technical north star — architecture, AI systems, and the hard calls that turn ambitious briefs into shipped products.",
    skills: ["Systems design", "AI & cloud", "Product architecture"],
    photo: "/team/salis-salman.jpg",
    linkedin: "https://www.linkedin.com/in/salis-salman",
    github: "https://github.com/salissalmann",
  },
  {
    name: "Abrar Ahmed",
    role: "Senior Full-Stack Engineer",
    bio: "Owns the full surface — polished interfaces, resilient APIs, and the glue that keeps complex products feeling simple.",
    skills: ["TypeScript", "Next.js", "Platform APIs"],
    photo: "/team/abrar-ahmed.jpg",
    linkedin: "https://www.linkedin.com/in/abrar-ahmed-dev",
    github: "https://github.com/AbrarAhmed111",
  },
  {
    name: "Hasan Murad",
    role: "Senior Full-Stack Engineer",
    bio: "Ships with discipline — clean React/Node stacks, thoughtful DX, and reliability baked in before the first user lands.",
    skills: ["React", "Node.js", "DevOps"],
    photo: "/team/hasan-murad.jpg",
    linkedin: "https://www.linkedin.com/in/hasan-murad02",
    github: "https://github.com/hasan-murad02",
  },
  {
    name: "Anusha Salman",
    role: "Brand & Marketing Lead",
    bio: "Shapes how Fragment shows up in the world — voice, narrative, and the stories that make the work memorable.",
    skills: ["Brand voice", "Content", "Campaigns"],
    photo: "/team/anusha-salman.jpg",
    linkedin: "https://www.linkedin.com/in/anousha-salman-87a675304",
  },
  {
    name: "Abdur Rehman",
    role: "Backend Systems Engineer",
    bio: "Builds the invisible layer — data models, services, and integrations that stay calm under pressure.",
    skills: ["APIs", "Databases", "Integrations"],
    photo: "/team/abdur-rehman.jpg",
    linkedin: "https://www.linkedin.com/in/abdurehman2",
  },
  {
    name: "Raffay Arshad",
    role: "Mobile Product Engineer",
    bio: "Crafts native-feeling apps — React Native, offline-first flows, and client experiences that hold up in the real world.",
    skills: ["React Native", "Mobile UX", "Offline sync"],
    photo: "/team/raffay-arshad.jpg",
    linkedin: "https://www.linkedin.com/in/rafay-abbasi",
    github: "https://github.com/Raffay6671",
  },
];

export const services: Service[] = [
  {
    num: "01",
    title: "Product Engineering",
    desc: "Web and mobile products engineered from the ground up.",
  },
  {
    num: "02",
    title: "AI Systems",
    desc: "AI agents, RAG systems, intelligent workflows and automation.",
  },
  {
    num: "03",
    title: "Cloud & Infrastructure",
    desc: "Scalable infrastructure, CI/CD, observability and cloud architecture.",
  },
  {
    num: "04",
    title: "Automation",
    desc: "Replacing repetitive operational work with intelligent systems.",
  },
  {
    num: "05",
    title: "Data & Integrations",
    desc: "APIs, ETL pipelines, event-driven architectures and complex integrations.",
  },
];

export const serviceDetail: ServiceDetail[] = [
  {
    num: "01",
    title: "Product Engineering",
    lead: "Products built to be maintained, not just launched.",
    items: [
      "Web applications",
      "Mobile applications",
      "SaaS platforms",
      "Internal tools",
      "MVPs",
      "Product modernization",
    ],
  },
  {
    num: "02",
    title: "AI Engineering",
    lead: "AI that is grounded, evaluated and shipped into real workflows.",
    items: [
      "AI agents",
      "RAG",
      "LLM integrations",
      "AI copilots",
      "Document intelligence",
      "AI automation",
    ],
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    lead: "Infrastructure you can reason about at 3am.",
    items: [
      "AWS",
      "GCP",
      "Infrastructure as Code",
      "CI/CD",
      "Containers",
      "Serverless",
      "Observability",
    ],
  },
  {
    num: "04",
    title: "Automation",
    lead: "Operational work removed, not reorganised.",
    items: [
      "Workflow automation",
      "Browser automation",
      "CRM/ERP integrations",
      "WhatsApp automation",
      "Business process automation",
    ],
  },
  {
    num: "05",
    title: "Data & Backend Systems",
    lead: "The layer everything else depends on.",
    items: [
      "APIs",
      "Event-driven architecture",
      "ETL",
      "Data pipelines",
      "Distributed systems",
      "Database architecture",
    ],
  },
];

export const steps: Step[] = [
  {
    num: "01",
    title: "Understand",
    desc: "Constraints, users and the system already in place.",
  },
  {
    num: "02",
    title: "Architect",
    desc: "The shape of the solution before a line of product code.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Short cycles, working software, visible progress.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "Release, observability and the handover that holds.",
  },
  {
    num: "05",
    title: "Evolve",
    desc: "Measure, harden and extend once it is live.",
  },
];

export const tech: TechNode[] = [
  { id: "react", label: "React", col: 0, sx: 6, sy: 14 },
  { id: "node", label: "Node", col: 0, sx: 22, sy: 66 },
  { id: "python", label: "Python", col: 1, sx: 40, sy: 8 },
  { id: "ai", label: "AI", col: 1, sx: 12, sy: 40 },
  { id: "pg", label: "PostgreSQL", col: 2, sx: 72, sy: 20 },
  { id: "aws", label: "AWS", col: 2, sx: 86, sy: 62 },
  { id: "auto", label: "Automation", col: 3, sx: 56, sy: 82 },
  { id: "apis", label: "APIs", col: 3, sx: 74, sy: 44 },
];

export const LAYOUT: Record<string, [number, number]> = {
  react: [14, 16],
  python: [50, 16],
  node: [50, 44],
  ai: [14, 44],
  apis: [50, 72],
  pg: [84, 30],
  aws: [84, 58],
  auto: [16, 72],
};

export const LINKS: [string, string][] = [
  ["react", "apis"],
  ["ai", "node"],
  ["python", "node"],
  ["node", "apis"],
  ["apis", "pg"],
  ["apis", "aws"],
  ["auto", "apis"],
  ["ai", "apis"],
];

export const MARQUEE = [
  "PRODUCT ENGINEERING",
  "AI SYSTEMS",
  "RAG",
  "CLOUD ARCHITECTURE",
  "CI/CD",
  "AGENTS",
  "EVENT-DRIVEN",
  "ETL",
  "OBSERVABILITY",
  "AUTOMATION",
] as const;

export const CATS = [
  "ALL",
  "PRODUCT",
  "AI",
  "AUTOMATION",
  "INFRASTRUCTURE",
  "DATA",
] as const;

export const BUDGETS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

export const PTYPES = [
  "New product",
  "AI / automation",
  "Existing product",
  "Cloud / infrastructure",
  "Mobile app",
  "Other",
] as const;

export const TIMELINES = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploring",
] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type UpworkCase = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  cover: string;
  images: string[];
  href?: string;
};

/** Upwork / delivered work screenshots — covers featured specially */
export const upworkCases: UpworkCase[] = [
  {
    slug: "premedpk",
    name: "PreMed.PK",
    tag: "PRODUCT · EDTECH",
    blurb: "National exam-prep rebuild — 100K+ students, ~70M attempts, RAG study search, store apps.",
    cover: "/upwork/premedpk/cover.png",
    images: [
      "/upwork/premedpk/image-1.png",
      "/upwork/premedpk/image-2.png",
      "/upwork/premedpk/image-3.png",
    ],
    href: "/work/premedpk",
  },
  {
    slug: "ensemble",
    name: "Ensemble.io · Flux Foundry",
    tag: "DATA · AI",
    blurb: "Bronze–Silver–Gold spare-parts pipeline — Bedrock enrich, ISO 14224, tenant-aware graph.",
    cover: "/upwork/ensemble/cover.png",
    images: [
      "/upwork/ensemble/image-1.png",
      "/upwork/ensemble/image-2.png",
    ],
    href: "/work/ensemble",
  },
  {
    slug: "ale",
    name: "Elite Health Care",
    tag: "HEALTHCARE · CLOUD",
    blurb: "ALE clinical/scheduling plus AgencySync — EVV sweeps, authorizations, remittance billing.",
    cover: "/upwork/ale/cover.png",
    images: ["/upwork/ale/image-1.png", "/upwork/ale/image-2.png"],
    href: "/work/ale",
  },
  {
    slug: "fairticket",
    name: "Fair Ticket",
    tag: "PRODUCT · MARKETPLACE",
    blurb: "Austrian marketplace — Workers booking, D3 seatmaps, Stripe Connect, fan and vendor apps.",
    cover: "/upwork/fairticket/cover.png",
    images: [
      "/upwork/fairticket/image-1.jpg",
      "/upwork/fairticket/image-2.jpg",
      "/upwork/fairticket/image-3.jpg",
    ],
    href: "/work/fairticket",
  },
  {
    slug: "hashtagclean",
    name: "Hashtag Clean · Pulse",
    tag: "SAAS · OPERATIONS",
    blurb: "Pulse and Hygeia — AI-routed day plans, Twilio SMS, ServiceM8 and PeopleHR sync.",
    cover: "/upwork/hashtagclean/cover.png",
    images: [
      "/upwork/hashtagclean/image-1.png",
      "/upwork/hashtagclean/image-2.png",
      "/upwork/hashtagclean/image-3.png",
    ],
    href: "/work/hashtagclean",
  },
  {
    slug: "antematter",
    name: "Antematter",
    tag: "ERP · AUTOMATION",
    blurb: "Finance and HR cutover onto ERPNext — migration, custom Frappe workflows, hardened AWS.",
    cover: "/upwork/antematter/cover.png",
    images: [
      "/upwork/antematter/image-1.png",
      "/upwork/antematter/image-2.png",
    ],
    href: "/work/antematter",
  },
];

export function getUpworkCase(slug: string): UpworkCase | undefined {
  return upworkCases.find((c) => c.slug === slug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  const index = i < 0 ? 0 : (i + 1) % projects.length;
  return projects[index];
}

export function getFeaturedProjects(): Project[] {
  return FEATURED_SLUGS.map((slug) => getProject(slug)!);
}

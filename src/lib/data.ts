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

/** Studio socials (footer) — Salis Salman */
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/salis-salman",
  github: "https://github.com/salissalmann",
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
    cats: ["PRODUCT"],
    year: "2024",
    ratio: "16/10",
    desc: "Large-scale medical entrance preparation platform serving a national student base.",
    tech: ["Next.js", "Node", "PostgreSQL"],
    overview:
      "A learning platform built around question banks, timed mocks and progress analytics, designed to stay responsive under heavy concurrent exam-season load.",
    problem:
      "Exam-prep content was scattered across PDFs and ad-hoc groups, with no reliable way to practise under real test conditions or track weak areas over time.",
    solution:
      "A structured content model, a timed test engine and an analytics layer that turns every attempt into a signal students and mentors can act on.",
    layers: [
      { label: "CLIENT", nodes: ["Web app", "Mobile web", "Admin console"] },
      { label: "SERVICES", nodes: ["Test engine", "Content API", "Analytics"] },
      { label: "DATA", nodes: ["PostgreSQL", "Object storage", "Cache"] },
    ],
    outcomes: [
      "Single source of truth for exam content",
      "Repeatable timed-test experience",
      "Per-topic performance visibility for students",
    ],
  },
  {
    slug: "ensemble",
    name: "Ensemble",
    cat: "DATA",
    cats: ["DATA", "INFRASTRUCTURE"],
    year: "2025",
    ratio: "4/3",
    desc: "Industrial manufacturing data platform for machine and production telemetry.",
    tech: ["React", "Python", "Time-series DB"],
    overview:
      "An operations platform that ingests machine telemetry, normalises it across lines and surfaces production state to plant and management users.",
    problem:
      "Production data lived inside isolated machine controllers and spreadsheets, so downtime and throughput questions could only be answered after the fact.",
    solution:
      "An ingestion pipeline with a normalised equipment model, plus dashboards and thresholds that make line state legible in near real time.",
    layers: [
      { label: "EDGE", nodes: ["Machine agents", "Protocol adapters"] },
      { label: "PIPELINE", nodes: ["Ingest", "Normalise", "Aggregate"] },
      { label: "SURFACE", nodes: ["Dashboards", "Alerts", "Exports"] },
    ],
    outcomes: [
      "Unified equipment data model",
      "Near real-time line visibility",
      "Historical analysis without manual collation",
    ],
  },
  {
    slug: "fairticket",
    name: "FairTicket",
    cat: "PRODUCT",
    cats: ["PRODUCT"],
    year: "2024",
    ratio: "16/10",
    desc: "Ticketing and resale marketplace with inventory, checkout and entry validation.",
    tech: ["Next.js", "Payments", "Redis"],
    overview:
      "A two-sided ticketing product covering listing, inventory locking, checkout and on-door validation.",
    problem:
      "Resale flows tend to break under contention: two buyers, one seat. Trust and correctness both depend on how inventory is held.",
    solution:
      "Short-lived inventory holds, idempotent checkout and signed entry tokens, so a ticket can only be sold and scanned once.",
    layers: [
      { label: "BUYER", nodes: ["Discovery", "Checkout", "Wallet"] },
      { label: "CORE", nodes: ["Inventory locks", "Payments", "Entry tokens"] },
      { label: "OPS", nodes: ["Organiser tools", "Scanning app"] },
    ],
    outcomes: [
      "Contention-safe checkout path",
      "Single-use validated entry",
      "Organiser-side inventory control",
    ],
  },
  {
    slug: "hashtagclean",
    name: "Hashtag Clean",
    cat: "SAAS",
    cats: ["PRODUCT", "AUTOMATION"],
    year: "2025",
    ratio: "4/3",
    desc: "Ops platform for cleaning teams — day planner, quotes, SMS, and live schedules.",
    tech: ["Next.js", "Node", "SMS"],
    overview:
      "Pulse — an operations platform that keeps cleaning crews, quotes and day schedules in one place instead of scattered chats and spreadsheets.",
    problem:
      "Field teams lived in group texts and paper run sheets, so dispatch, quoting and status updates constantly drifted out of sync.",
    solution:
      "A shared day planner with quote flows, SMS touchpoints and live schedule state that both office and field can trust.",
    layers: [
      { label: "OPS", nodes: ["Day planner", "Quotes", "Crew roster"] },
      { label: "COMMS", nodes: ["SMS", "Notifications", "Status updates"] },
      { label: "DATA", nodes: ["Schedules", "Clients", "Jobs"] },
    ],
    outcomes: [
      "Single source of truth for daily routes",
      "Faster quote-to-job handoff",
      "Live visibility for office and field",
    ],
  },
  {
    slug: "antematter",
    name: "Antematter",
    cat: "AUTOMATION",
    cats: ["AUTOMATION", "DATA"],
    year: "2025",
    ratio: "16/10",
    desc: "Business workflow and ERP automation across quoting, approvals and operations.",
    tech: ["Node", "Queues", "Integrations"],
    overview:
      "An automation layer sitting between existing business systems, moving work through defined states instead of email threads.",
    problem:
      "Operational work crossed four systems with manual re-entry at every boundary, making status unknowable and errors routine.",
    solution:
      "Event-driven workflows with typed integrations, retries and an audit trail for every state transition.",
    layers: [
      { label: "TRIGGERS", nodes: ["Forms", "Webhooks", "Schedules"] },
      {
        label: "ENGINE",
        nodes: ["Workflow runtime", "Queues", "Retries", "Audit log"],
      },
      { label: "SYSTEMS", nodes: ["ERP", "CRM", "Accounting"] },
    ],
    outcomes: [
      "Eliminated manual re-entry between systems",
      "Auditable state for every process run",
      "Failure isolation through queued retries",
    ],
  },
  {
    slug: "ale",
    name: "ALE Technologies",
    cat: "HEALTHCARE",
    cats: ["PRODUCT", "INFRASTRUCTURE"],
    year: "2025",
    ratio: "4/3",
    desc: "Production scheduling for Elite Health — React, Azure, Service Bus, and audit-ready flows.",
    tech: ["React", "Azure", "Service Bus"],
    overview:
      "Schedule Manager — a cloud scheduling system for Elite Health that keeps production calendars, capacity and audit trails in sync across teams.",
    problem:
      "Scheduling lived in disconnected tools with no reliable handoff between planners and the floor, so changes were slow and hard to audit.",
    solution:
      "A React front end on Azure with Service Bus–driven updates, role-aware workflows and an audit log for every schedule change.",
    layers: [
      { label: "CLIENT", nodes: ["Schedule UI", "Role views", "Approvals"] },
      { label: "CLOUD", nodes: ["Azure APIs", "Service Bus", "Auth"] },
      { label: "OPS", nodes: ["Capacity", "Audit trail", "Notifications"] },
    ],
    outcomes: [
      "Shared production calendar across teams",
      "Event-driven schedule updates",
      "Audit-ready change history",
    ],
  },
  {
    slug: "examora",
    name: "Examora",
    cat: "PRODUCT",
    cats: ["PRODUCT"],
    year: "2026",
    ratio: "16/10",
    desc: "Engineering entrance preparation platform with practice, mocks and revision paths.",
    tech: ["React Native", "Node", "PostgreSQL"],
    overview:
      "A mobile-first preparation product for engineering entrance candidates, built around short practice loops and spaced revision.",
    problem:
      "Preparation happens in fragments of time on a phone, but most material assumes long desktop study sessions.",
    solution:
      "Small offline-capable practice units, a revision scheduler and mock tests that mirror the real paper structure.",
    layers: [
      { label: "APP", nodes: ["Practice", "Mocks", "Revision"] },
      { label: "SERVICES", nodes: ["Scheduler", "Content API", "Scoring"] },
      { label: "DATA", nodes: ["PostgreSQL", "Sync store"] },
    ],
    outcomes: [
      "Offline-capable practice sessions",
      "Spaced revision scheduling",
      "Exam-accurate mock structure",
    ],
  },
];

/** Featured work order from design: PROJECTS indices 0, 3, 1, 5, 2 */
export const FEATURED_SLUGS = [
  "premedpk",
  "hashtagclean",
  "ensemble",
  "examora",
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
    blurb: "National exam-prep platform — web, mobile, and the content engine behind them.",
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
    name: "Ensemble · Flux Foundry",
    tag: "DATA · AI",
    blurb: "Medallion pipeline on AWS — raw parts data to searchable, enriched identities.",
    cover: "/upwork/ensemble/cover.png",
    images: [
      "/upwork/ensemble/image-1.png",
      "/upwork/ensemble/image-2.png",
    ],
    href: "/work/ensemble",
  },
  {
    slug: "ale",
    name: "ALE Technologies",
    tag: "HEALTHCARE · CLOUD",
    blurb: "Production scheduling for Elite Health — React, Azure, Service Bus, and audit-ready flows.",
    cover: "/upwork/ale/cover.png",
    images: ["/upwork/ale/image-1.png", "/upwork/ale/image-2.png"],
    href: "/work/ale",
  },
  {
    slug: "fairticket",
    name: "FairTicket",
    tag: "PRODUCT · MARKETPLACE",
    blurb: "Ticketing and resale — discovery, seats, checkout, and validated entry.",
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
    blurb: "Ops platform for cleaning teams — day planner, quotes, SMS, and live schedules.",
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
    tag: "AI · AGENTS",
    blurb: "Antifragile AI agents for knowledge orgs — strategy, engineering, and shipping.",
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

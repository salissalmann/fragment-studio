import type { Metadata } from "next";
import { SOCIAL, projects, services, team } from "./data";

/** Canonical production origin — never a preview URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://fragment-studio.vercel.app")
).replace(/\/$/, "");

export const SITE_NAME = "Fragment";
export const SITE_TAGLINE = "Digital Engineering Studio";
export const SITE_TITLE = "Fragment — Digital Engineering Studio";
export const SITE_DESCRIPTION =
  "Independent product engineering studio building software, AI systems, and infrastructure for ambitious teams. MVPs at startup cost, production AI, and cloud you can run.";

export const PAGES = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  },
  work: {
    title: "Work",
    description:
      "Selected products from Fragment — exam platforms, industrial data systems, marketplaces, and operations software shipped for real users.",
    path: "/work",
  },
  services: {
    title: "Services",
    description:
      "Product engineering, AI systems, cloud infrastructure, automation, and data — how Fragment designs and ships software for ambitious teams.",
    path: "/services",
  },
  team: {
    title: "Team",
    description:
      "Meet the Fragment studio — engineers, operators, and storytellers shipping products, AI systems, and infrastructure.",
    path: "/team",
  },
  contact: {
    title: "Contact",
    description:
      "Book a 30-minute discovery call with Fragment. Tell us what you are building and we will figure out the next step together.",
    path: "/contact",
  },
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
}): Metadata {
  const url = path;
  const socialTitle = ogTitle ?? `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.png"],
    },
  };
}

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: SITE_NAME,
        alternateName: SITE_TITLE,
        url: SITE_URL,
        logo: absoluteUrl("/icon-192.png"),
        image: absoluteUrl("/og.png"),
        description: SITE_DESCRIPTION,
        slogan: "Software, AI & systems for ambitious teams.",
        founder: {
          "@type": "Person",
          name: "Salis Salman",
          jobTitle: "Founder · Principal Engineer",
          url: SOCIAL.linkedin,
          sameAs: [SOCIAL.linkedin, SOCIAL.github],
        },
        numberOfEmployees: team.length,
        sameAs: [SOCIAL.linkedin, SOCIAL.github],
        knowsAbout: services.map((s) => s.title),
        areaServed: { "@type": "Place", name: "Worldwide" },
        serviceType: services.map((s) => s.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering services",
          itemListElement: services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.desc,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
  return jsonLd(graph);
}

export function projectJsonLd(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.overview,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: project.year,
    inLanguage: "en",
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: [...project.cats, ...project.tech].join(", "),
  });
}

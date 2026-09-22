import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContainBlurImage } from "@/components/ContainBlurImage";
import { ExamoraCover } from "@/components/ExamoraCover";
import { JsonLd } from "@/components/JsonLd";
import {
  getNextProject,
  getProject,
  getUpworkCase,
  projects,
} from "@/lib/data";
import { projectJsonLd, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };

  const upwork = getUpworkCase(slug);
  const description = project.desc;
  const url = `/work/${project.slug}`;
  const images = upwork?.cover
    ? [
        {
          url: upwork.cover,
          width: 1420,
          height: 1080,
          alt: `${project.name} cover`,
        },
      ]
    : undefined;

  const socialTitle = `${project.name} — ${SITE_NAME}`;
  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: socialTitle,
    description,
  };
  if (upwork?.cover) twitter.images = [upwork.cover];

  return {
    title: { absolute: `${project.name} — ${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description: project.overview,
      url,
      type: "article",
      ...(images ? { images } : {}),
    },
    twitter,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const upwork = getUpworkCase(slug);
  const isExamora = slug === "examora";
  const hasPhotoCover = Boolean(upwork?.cover) && !isExamora;
  const hasVisualCover = hasPhotoCover || isExamora;
  const screenshots = upwork?.images ?? [];
  const jsonLd = projectJsonLd(slug);

  return (
    <main>
      {jsonLd ? <JsonLd json={jsonLd} /> : null}

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(32px,5vw,64px) clamp(18px,4.5vw,64px) clamp(28px,3.8vw,48px)",
        }}
      >
        {/* Category watermark — large, barely visible, specific to each project type */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-0.06em",
            right: "-0.02em",
            fontSize: "clamp(110px,17vw,250px)",
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: "var(--ink)",
            opacity: 0.038,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {project.cats[0]}
        </div>

        {/* Top row: back link + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: "clamp(34px,4.8vw,60px)",
          }}
        >
          <Link
            href="/work"
            className="mono hover-accent"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.16em",
              color: "var(--mono)",
              textDecoration: "none",
            }}
          >
            ← ALL WORK
          </Link>
          <div
            className="mono"
            style={{
              display: "flex",
              gap: 16,
              fontSize: 10.5,
              letterSpacing: "0.16em",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {project.cats.map((c) => (
              <span key={c} style={{ color: "var(--accent)" }}>
                {c}
              </span>
            ))}
            <span
              style={{
                width: 3,
                height: 3,
                background: "rgba(var(--ink-rgb),0.2)",
                display: "inline-block",
                borderRadius: "50%",
              }}
            />
            <span style={{ color: "var(--faint)" }}>{project.year}</span>
          </div>
        </div>

        {/* Project title */}
        <h1
          style={{
            fontSize: "clamp(52px,8.8vw,124px)",
            lineHeight: 0.91,
            letterSpacing: "-0.045em",
            fontWeight: 500,
            margin: "0 0 clamp(28px,3.6vw,46px)",
            maxWidth: "14ch",
            position: "relative",
          }}
        >
          {project.name}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        {/* Overview + tech — side by side */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(24px,4vw,64px)",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              flex: "1 1 340px",
              fontSize: "clamp(16px,1.52vw,21px)",
              lineHeight: 1.58,
              color: "var(--muted)",
              maxWidth: "54ch",
              margin: 0,
            }}
          >
            {project.overview}
          </p>
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.22em",
                color: "var(--faint)",
              }}
            >
              TECHNOLOGIES
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    border: "1px solid rgba(var(--ink-rgb),0.18)",
                    padding: "8px 13px",
                    fontSize: 10.5,
                    letterSpacing: "0.09em",
                    color: "var(--ink)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover + Problem / Solution ── */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px,4.5vw,64px) clamp(40px,5.5vw,68px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            background: "rgba(var(--ink-rgb),0.12)",
          }}
        >
          {/* Cover image — shown when available */}
          {hasVisualCover && (
            <div
              style={{
                flex: "1.2 1 320px",
                minWidth: 0,
                position: "relative",
                minHeight: 340,
                maxHeight: 500,
                overflow: "hidden",
                background: "var(--tile)",
              }}
            >
              {isExamora ? (
                <ExamoraCover label="EXAMORA" />
              ) : (
                <ContainBlurImage
                  src={upwork!.cover}
                  alt={`${project.name} cover`}
                  priority
                  sizes="(max-width: 800px) 100vw, 55vw"
                />
              )}
            </div>
          )}

          {/* Problem + Solution stacked when beside cover; side by side when no cover */}
          {hasVisualCover ? (
            <div
              style={{
                flex: "1 1 260px",
                minWidth: 0,
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "clamp(26px,3vw,42px)",
                  borderBottom: "1px solid rgba(var(--ink-rgb),0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: "var(--accent)",
                  }}
                >
                  THE PROBLEM
                </span>
                <p
                  style={{
                    fontSize: "clamp(14.5px,1.15vw,17px)",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {project.problem}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "clamp(26px,3vw,42px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: "var(--accent)",
                  }}
                >
                  THE SOLUTION
                </span>
                <p
                  style={{
                    fontSize: "clamp(14.5px,1.15vw,17px)",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    margin: 0,
                  }}
                >
                  {project.solution}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: 0,
                  background: "var(--bg)",
                  padding: "clamp(26px,3vw,42px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: "var(--accent)",
                  }}
                >
                  THE PROBLEM
                </span>
                <p
                  style={{
                    fontSize: "clamp(15px,1.2vw,18px)",
                    lineHeight: 1.68,
                    color: "var(--muted)",
                    margin: 0,
                    maxWidth: "48ch",
                  }}
                >
                  {project.problem}
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: 0,
                  background: "var(--bg)",
                  padding: "clamp(26px,3vw,42px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: "var(--accent)",
                  }}
                >
                  THE SOLUTION
                </span>
                <p
                  style={{
                    fontSize: "clamp(15px,1.2vw,18px)",
                    lineHeight: 1.68,
                    color: "var(--muted)",
                    margin: 0,
                    maxWidth: "48ch",
                  }}
                >
                  {project.solution}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Architecture ── */}
      <section
        style={{
          background: "var(--dark)",
          color: "var(--ondark)",
          padding: "clamp(40px,6vw,86px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(18px,4.5vw,64px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(30px,4.2vw,54px)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px,3.6vw,48px)",
                letterSpacing: "-0.03em",
                fontWeight: 500,
              }}
            >
              Architecture
            </h2>
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(var(--ondark-rgb),0.36)",
              }}
            >
              FRAGMENTS → SYSTEM
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {project.layers.map((l, li) => (
              <div
                key={l.label}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(14px,3vw,40px)",
                  alignItems: "flex-start",
                  padding: "clamp(20px,2.6vw,32px) 0",
                  borderTop: "1px solid rgba(var(--ondark-rgb),0.12)",
                }}
              >
                <div
                  style={{
                    flex: "0 0 112px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    paddingTop: 3,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "0.22em",
                      color: "var(--accent)",
                    }}
                  >
                    {String(li + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      color: "rgba(var(--ondark-rgb),0.62)",
                    }}
                  >
                    {l.label}
                  </span>
                </div>
                <div
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(6px,0.8vw,10px)",
                    alignItems: "center",
                  }}
                >
                  {l.nodes.flatMap((n, ni) => {
                    const chip = (
                      <span
                        key={`node-${n}`}
                        className="mono"
                        style={{
                          border: "1px solid rgba(var(--ondark-rgb),0.22)",
                          padding: "10px 16px",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          color: "var(--ondark)",
                        }}
                      >
                        {n}
                      </span>
                    );
                    if (ni < l.nodes.length - 1) {
                      return [
                        chip,
                        <span
                          key={`sep-${ni}`}
                          aria-hidden="true"
                          style={{
                            fontSize: 10,
                            color: "rgba(var(--ondark-rgb),0.2)",
                            userSelect: "none",
                          }}
                        >
                          →
                        </span>,
                      ];
                    }
                    return [chip];
                  })}
                </div>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid rgba(var(--ondark-rgb),0.12)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Screenshots from the field ── */}
      {screenshots.length > 0 && (
        <section
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "clamp(36px,5vw,66px) clamp(18px,4.5vw,64px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: "clamp(18px,2.4vw,28px)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(20px,2.4vw,32px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
              }}
            >
              From the field
            </h2>
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--faint)",
              }}
            >
              {String(screenshots.length).padStart(2, "0")} SCREENS
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "clamp(8px,1.2vw,14px)",
            }}
          >
            {screenshots.map((img, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                  background: "var(--tile)",
                  border: "1px solid rgba(var(--ink-rgb),0.1)",
                }}
              >
                <ContainBlurImage
                  src={img}
                  alt={`${project.name} screen ${i + 1}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Tech + Outcomes ── */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(36px,5vw,64px) clamp(18px,4.5vw,64px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(26px,4vw,64px)",
          borderTop: "1px solid rgba(var(--ink-rgb),0.1)",
        }}
      >
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.22em",
              color: "var(--faint)",
              display: "block",
              marginBottom: 20,
            }}
          >
            TECHNOLOGIES
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  border: "1px solid rgba(var(--ink-rgb),0.2)",
                  padding: "10px 14px",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--ink)",
                  display: "inline-block",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: "1.6 1 300px", minWidth: 0 }}>
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.22em",
              color: "var(--faint)",
              display: "block",
              marginBottom: 20,
            }}
          >
            KEY OUTCOMES
          </span>
          <div style={{ borderTop: "1px solid rgba(var(--ink-rgb),0.1)" }}>
            {project.outcomes.map((o, i) => (
              <div
                key={o}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(var(--ink-rgb),0.1)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    color: "var(--accent)",
                    flex: "0 0 26px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: "clamp(15px,1.3vw,18px)",
                    lineHeight: 1.52,
                    color: "var(--ink)",
                  }}
                >
                  {o}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next project ── */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(24px,3vw,40px) clamp(18px,4.5vw,64px) clamp(44px,6vw,80px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
        }}
      >
        <Link
          href={`/work/${next.slug}`}
          style={{
            cursor: "pointer",
            minWidth: 0,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--faint)",
            }}
          >
            NEXT PROJECT
          </span>
          <div
            style={{
              marginTop: 10,
              fontSize: "clamp(24px,3.4vw,44px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
            }}
          >
            {next.name} <span style={{ color: "var(--accent)" }}>→</span>
          </div>
        </Link>
        <Link
          href="/contact"
          className="mono btn-fill"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "16px 24px",
            textDecoration: "none",
          }}
        >
          Build something similar →
        </Link>
      </section>
    </main>
  );
}

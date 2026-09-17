import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExamoraCover } from "@/components/ExamoraCover";
import {
  getNextProject,
  getProject,
  getUpworkCase,
  projects,
} from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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

  return (
    <main>
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(32px, 5vw, 70px) clamp(18px, 4.5vw, 64px) clamp(28px, 4vw, 50px)",
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
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "clamp(26px, 4vw, 48px)",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 104px)",
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {project.name}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <div
            className="mono"
            style={{
              display: "flex",
              gap: 24,
              fontSize: 10.5,
              letterSpacing: "0.16em",
              color: "var(--mono)",
            }}
          >
            <span>{project.cat}</span>
            <span>{project.year}</span>
          </div>
        </div>
        <p
          style={{
            margin: "clamp(20px, 3vw, 30px) 0 0",
            fontSize: "clamp(16px, 1.5vw, 22px)",
            lineHeight: 1.55,
            color: "var(--ink)",
            maxWidth: "56ch",
          }}
        >
          {project.overview}
        </p>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(34px, 5vw, 60px)",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "var(--tile)",
            aspectRatio: hasPhotoCover ? "1420 / 1080" : "21/9",
            minHeight: 220,
            overflow: "hidden",
            border: "1px solid rgba(var(--ink-rgb),0.12)",
          }}
        >
          {isExamora ? (
            <ExamoraCover label="EXAMORA" />
          ) : hasPhotoCover ? (
            <Image
              src={upwork!.cover}
              alt={`${project.name} cover`}
              fill
              priority
              sizes="(max-width: 1480px) 100vw, 1480px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.7,
                  backgroundImage:
                    "linear-gradient(rgba(var(--ink-rgb),0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--ink-rgb),0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 110,
                    background: "rgba(var(--ink-rgb),0.8)",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    width: 44,
                    height: 64,
                    background: "var(--accent)",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    width: 44,
                    height: 140,
                    background: "rgba(var(--ink-rgb),0.28)",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    width: 44,
                    height: 88,
                    background: "rgba(var(--ink-rgb),0.8)",
                    display: "block",
                  }}
                />
              </div>
            </>
          )}
          {!isExamora && (
            <span
              className="mono"
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                fontSize: 9.5,
                letterSpacing: "0.16em",
                color: hasPhotoCover
                  ? "rgba(250,249,244,0.7)"
                  : "var(--faint)",
                textShadow: hasPhotoCover
                  ? "0 1px 3px rgba(0,0,0,0.6)"
                  : undefined,
              }}
            >
              {hasPhotoCover ? "COVER" : "PROJECT VISUAL"}
            </span>
          )}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(36px, 5vw, 66px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            background: "rgba(var(--ink-rgb),0.14)",
          }}
        >
          <div
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              background: "var(--bg)",
              padding: "clamp(20px, 2.6vw, 34px)",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--accent)",
              }}
            >
              THE PROBLEM
            </span>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {project.problem}
            </p>
          </div>
          <div
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              background: "var(--bg)",
              padding: "clamp(20px, 2.6vw, 34px)",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--accent)",
              }}
            >
              THE SOLUTION
            </span>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(15px, 1.2vw, 18px)",
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--dark)",
          color: "var(--ondark)",
          padding: "clamp(40px, 6vw, 86px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(18px, 4.5vw, 64px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(28px, 4vw, 48px)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px, 3.6vw, 48px)",
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
                color: "rgba(var(--ondark-rgb),0.4)",
              }}
            >
              FRAGMENTS → SYSTEM
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {project.layers.map((l) => (
              <div
                key={l.label}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(14px, 3vw, 40px)",
                  alignItems: "center",
                  padding: "clamp(18px, 2.4vw, 30px) 0",
                  borderTop: "1px solid rgba(var(--ondark-rgb),0.16)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    flex: "0 0 96px",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--accent)",
                  }}
                >
                  {l.label}
                </span>
                <div
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {l.nodes.map((n) => (
                    <span
                      key={n}
                      className="mono"
                      style={{
                        border: "1px solid rgba(var(--ondark-rgb),0.3)",
                        padding: "11px 15px",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        transition:
                          "background .3s ease, color .3s ease, border-color .3s ease",
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div
              style={{ borderTop: "1px solid rgba(var(--ondark-rgb),0.16)" }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(36px, 5vw, 70px) clamp(18px, 4.5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(26px, 4vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div style={{ flex: "1 1 260px", minWidth: 0 }}>
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--faint)",
            }}
          >
            TECHNOLOGIES
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 18,
            }}
          >
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
        <div style={{ flex: "1.4 1 320px", minWidth: 0 }}>
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--faint)",
            }}
          >
            KEY OUTCOMES
          </span>
          <div
            style={{
              marginTop: 18,
              borderTop: "1px solid rgba(var(--ink-rgb),0.14)",
            }}
          >
            {project.outcomes.map((o) => (
              <div
                key={o}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "baseline",
                  padding: "15px 0",
                  borderBottom: "1px solid rgba(var(--ink-rgb),0.14)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: "var(--accent)",
                    display: "block",
                    flex: "0 0 auto",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(15px, 1.3vw, 19px)",
                    lineHeight: 1.5,
                  }}
                >
                  {o}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(40px, 6vw, 80px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(var(--ink-rgb),0.14)",
          paddingTop: "clamp(24px, 3vw, 40px)",
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
              fontSize: "clamp(24px, 3.4vw, 44px)",
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

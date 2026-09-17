"use client";

import { team } from "@/lib/data";
import { TeamPhoto } from "@/components/TeamPhoto";

export default function TeamPage() {
  return (
    <main>
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(40px, 7vw, 100px) clamp(18px, 4.5vw, 64px) clamp(30px, 4vw, 52px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "clamp(18px, 3vw, 32px)",
          }}
        >
          <span
            style={{
              width: 34,
              height: 1,
              background: "var(--accent)",
              display: "block",
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mono)",
            }}
          >
            07 PEOPLE
          </span>
        </div>
        <h1
          style={{
            fontSize: "clamp(42px, 7.6vw, 118px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            margin: 0,
          }}
        >
          The team
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "clamp(20px, 3vw, 32px) 0 0",
            fontSize: "clamp(15.5px, 1.25vw, 19px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "44ch",
          }}
        >
          Engineers, builders, operators and storytellers.
        </p>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(40px, 6vw, 80px)",
        }}
      >
        <div style={{ borderTop: "1px solid rgba(var(--ink-rgb),0.14)" }}>
          {team.map((p, i) => (
            <div
              key={p.name}
              className="team-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(18px, 3vw, 44px)",
                padding: "clamp(20px, 3vw, 34px) 0",
                borderBottom: "1px solid rgba(var(--ink-rgb),0.14)",
                alignItems: "flex-start",
              }}
            >
              <span
                className="mono"
                style={{
                  flex: "0 0 auto",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  color: "var(--accent)",
                  paddingTop: 6,
                }}
              >
                0{i + 1}
              </span>
              <div
                style={{
                  flex: "0 0 clamp(110px, 14vw, 180px)",
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--ink-rgb),0.1)",
                }}
              >
                <TeamPhoto member={p} />
              </div>
              <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(24px, 3.4vw, 46px)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  {p.name}
                </h2>
                <div
                  className="mono"
                  style={{
                    marginTop: 10,
                    fontSize: 10.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--mono)",
                  }}
                >
                  {p.role}
                </div>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    maxWidth: "48ch",
                  }}
                >
                  {p.bio}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    marginTop: 18,
                  }}
                >
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="mono"
                      style={{
                        fontSize: 9.5,
                        letterSpacing: "0.12em",
                        color: "var(--mono)",
                        border: "1px solid rgba(var(--ink-rgb),0.16)",
                        padding: "6px 9px",
                        display: "inline-block",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {(p.linkedin || p.github) && (
                  <div
                    className="mono"
                    style={{
                      display: "flex",
                      gap: 16,
                      marginTop: 18,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                    }}
                  >
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-accent"
                        style={{
                          color: "var(--ink)",
                          borderBottom: "1px solid rgba(var(--ink-rgb),0.25)",
                          textDecoration: "none",
                        }}
                      >
                        LINKEDIN ↗
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-accent"
                        style={{
                          color: "var(--ink)",
                          borderBottom: "1px solid rgba(var(--ink-rgb),0.25)",
                          textDecoration: "none",
                        }}
                      >
                        GITHUB ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

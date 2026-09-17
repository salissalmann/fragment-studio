"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeroGlyph } from "@/components/HeroGlyph";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { ProjectCard } from "@/components/ProjectCard";
import { TeamPhoto } from "@/components/TeamPhoto";
import {
  getFeaturedProjects,
  MARQUEE,
  services,
  steps,
  team,
} from "@/lib/data";

const METRICS: {
  v: number;
  suf: string;
  label: string;
  pre?: string;
}[] = [
  { v: 8, suf: "+", label: "Products shipped" },
  { v: 200, suf: "K+", label: "Users reached" },
  { v: 70, suf: "M+", label: "Interactions processed" },
  { v: 40, suf: "K+", label: "Revenue generated", pre: "$" },
  { v: 7, suf: "", label: "Engineers & specialists" },
];

const PITCH = [
  {
    num: "01",
    title: "MVPs at startup cost",
    desc: "Scoped tight, built fast. You get a working product in weeks, not a quarter of discovery decks.",
    points: [
      "Fixed, low-cost MVP scopes",
      "Weekly shipping cadence",
      "Real architecture from day one",
    ],
  },
  {
    num: "02",
    title: "Vibe-coded apps, made real",
    desc: "Built your app with AI and hit the wall? We take the codebase from prototype to production.",
    points: [
      "Auth, permissions and data model rewrites",
      "Security hardening and dependency audit",
      "Tests, CI/CD and error monitoring",
    ],
  },
  {
    num: "03",
    title: "The parts you can't handle",
    desc: "The company layer around your product — the work that only shows up once real users arrive.",
    points: [
      "Infrastructure, scaling and observability",
      "Security reviews and access control",
      "Ongoing engineering ownership",
    ],
  },
] as const;

const FEATURED_FLEX = [
  "1 1 100%",
  "1.4 1 380px",
  "1 1 300px",
  "1 1 300px",
  "1.4 1 380px",
] as const;

const marqueeItems = [...MARQUEE, ...MARQUEE];

export default function HomePage() {
  const [mt, setMt] = useState(0);
  const [svc, setSvc] = useState<number | null>(null);
  const [proc, setProc] = useState(0);
  const metricsRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const run = () => {
      if (counted.current) return;
      counted.current = true;
      if (reduced) {
        setMt(1);
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setMt(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run();
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sec = document.querySelector("[data-proc]");
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const p =
        (window.innerHeight * 0.85 - r.top) / Math.max(r.height * 0.7, 1);
      const step = Math.max(0, Math.min(5, Math.round(p * 5)));
      setProc(step);
    };
    let raf = 0;
    const handler = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        onScroll();
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollWork = () => {
    const el = document.querySelector("[data-work]");
    if (el instanceof HTMLElement) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const featured = getFeaturedProjects();
  const procWidth = `${((proc / 5) * 100).toFixed(0)}%`;

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(36px, 6vw, 86px) clamp(18px, 4.5vw, 64px) clamp(40px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(20px, 3vw, 34px)",
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
                  textTransform: "uppercase",
                }}
              >
                Independent digital engineering studio
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(42px, 6.6vw, 96px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                fontWeight: 500,
                margin: "0 0 clamp(20px, 2.6vw, 30px)",
              }}
            >
              We build the{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                systems
              </span>
              <br />
              behind ambitious
              <br />
              ideas
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(15.5px, 1.25vw, 19px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "47ch",
                margin: "0 0 clamp(26px, 3vw, 38px)",
              }}
            >
              Fragment is a product engineering studio building software, AI
              systems and infrastructure for companies that need more than
              another agency.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                alignItems: "center",
              }}
            >
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
                Start a project →
              </Link>
              <button
                type="button"
                onClick={scrollWork}
                className="mono hover-accent"
                style={{
                  fontSize: 11.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  padding: "16px 6px",
                  cursor: "pointer",
                  border: 0,
                  borderBottom: "1px solid var(--ink)",
                  background: "transparent",
                  transition: "color .3s ease, border-color .3s ease",
                }}
              >
                Explore our work ↓
              </button>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 380px",
              minWidth: 0,
              position: "relative",
              border: "1px solid rgba(var(--ink-rgb),0.14)",
              background: "var(--panel)",
              padding: "clamp(18px, 2.2vw, 28px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(18px, 2.4vw, 28px)",
            }}
          >
            <div
              className="mono"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                fontSize: 9.5,
                letterSpacing: "0.18em",
                color: "var(--faint)",
              }}
            >
              <span>FRAGMENT / SYSTEM</span>
              <span>FIG. 01</span>
            </div>
            <HeroGlyph />
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {(
                [
                  ["01", "Fragments", "scattered"],
                  ["02", "Systems", "connected"],
                  ["03", "Products", "shipped"],
                ] as const
              ).map(([num, label, status]) => (
                <div
                  key={num}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    borderTop: "1px solid rgba(var(--ink-rgb),0.14)",
                    paddingTop: 12,
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
                    {num}
                  </span>
                  <span style={{ fontSize: 13.5, color: "var(--ink)" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      flex: "1 1 auto",
                      height: 1,
                      background: "rgba(var(--ink-rgb),0.14)",
                    }}
                  />
                  <span
                    className="mono"
                    style={{ fontSize: 9.5, color: "var(--faint)" }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                top: -1,
                left: -1,
                width: 9,
                height: 9,
                borderTop: "1px solid var(--accent)",
                borderLeft: "1px solid var(--accent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -1,
                right: -1,
                width: 9,
                height: 9,
                borderBottom: "1px solid var(--accent)",
                borderRight: "1px solid var(--accent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div
        style={{
          borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
          borderBottom: "1px solid rgba(var(--ink-rgb),0.12)",
          overflow: "hidden",
          padding: "14px 0",
          background: "var(--panel)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "fragMarquee 34s linear infinite",
          }}
        >
          {marqueeItems.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--mono)",
                padding: "0 22px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                whiteSpace: "nowrap",
              }}
            >
              {t}
              <span
                style={{
                  width: 4,
                  height: 4,
                  background: "var(--accent)",
                  display: "block",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(44px, 6vw, 86px) clamp(18px, 4.5vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <p
          style={{
            margin: "0 0 clamp(20px, 2.6vw, 32px)",
            fontSize: "clamp(17px, 2vw, 26px)",
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            maxWidth: "30ch",
            color: "var(--ink)",
          }}
        >
          A startup shipping products at lightning speed
          <span style={{ color: "var(--accent)" }}>.</span>
        </p>
        <div
          ref={metricsRef}
          data-metrics="1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 1,
            background: "rgba(var(--ink-rgb),0.12)",
          }}
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: "var(--bg)",
                padding: "clamp(18px, 2.4vw, 32px) clamp(14px, 1.8vw, 26px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(34px, 4.4vw, 62px)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {(m.pre ?? "") + Math.round(m.v * mt) + m.suf}
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 1,
                    background: "var(--accent)",
                    display: "block",
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--mono)",
                  }}
                >
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pitch */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(34px, 4.6vw, 70px) clamp(18px, 4.5vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(22px, 3vw, 38px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 54px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              fontWeight: 500,
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Small team. Startup pricing. Production standards
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.18em",
              color: "var(--faint)",
            }}
          >
            00 / HOW WE SHIP
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "rgba(var(--ink-rgb),0.14)",
            border: "1px solid rgba(var(--ink-rgb),0.14)",
          }}
        >
          {PITCH.map((p, i) => (
            <div
              key={p.num}
              style={{
                background: "var(--bg)",
                padding: "clamp(20px, 2.4vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "background .35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--panel2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
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
                  {p.num}
                </span>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2, 3].map((m) => (
                    <span
                      key={m}
                      style={{
                        width: 5,
                        height: 5,
                        display: "block",
                        background:
                          m <= i
                            ? "var(--accent)"
                            : "rgba(var(--ink-rgb),0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(19px, 2.1vw, 26px)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
                  paddingTop: 14,
                }}
              >
                {p.points.map((pt) => (
                  <div
                    key={pt}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: "var(--accent)",
                        display: "block",
                        flex: "0 0 auto",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: "var(--ink)",
                      }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services list */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 70px) clamp(18px, 4.5vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(26px, 3.4vw, 46px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(30px, 4.4vw, 62px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 500,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            We turn fragments into products
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.18em",
              color: "var(--faint)",
            }}
          >
            01 / CAPABILITIES
          </span>
        </div>
        <div style={{ borderTop: "1px solid rgba(var(--ink-rgb),0.14)" }}>
          {services.map((s, i) => {
            const on = svc === i;
            return (
              <Link
                key={s.num}
                href="/services"
                onMouseEnter={() => setSvc(i)}
                onMouseLeave={() => setSvc(null)}
                style={{
                  borderBottom: "1px solid rgba(var(--ink-rgb),0.14)",
                  padding: "clamp(18px, 2.4vw, 30px) 0",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(14px, 2.4vw, 40px)",
                  alignItems: "flex-start",
                  background: on ? "var(--panel3)" : "transparent",
                  transition: "background .35s ease, padding-left .35s ease",
                  paddingLeft: on ? 14 : 0,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.16em",
                    color: "var(--accent)",
                    flex: "0 0 auto",
                    paddingTop: 8,
                  }}
                >
                  {s.num}
                </span>
                <h3
                  style={{
                    flex: "1 1 240px",
                    minWidth: 0,
                    margin: 0,
                    fontSize: "clamp(22px, 2.9vw, 38px)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    flex: "1 1 260px",
                    minWidth: 0,
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    maxWidth: "42ch",
                  }}
                >
                  {s.desc}
                </p>
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                    paddingTop: 6,
                  }}
                >
                  {[0, 1, 2, 3, 4].map((b) => (
                    <span
                      key={b}
                      style={{
                        width: 4,
                        display: "block",
                        background: on
                          ? "var(--accent)"
                          : "rgba(var(--ink-rgb),0.22)",
                        height: on
                          ? `${10 + ((b * 7 + i * 5) % 26)}px`
                          : "10px",
                        transition:
                          "height .4s cubic-bezier(.2,.7,.2,1), background .4s ease",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="mono"
                  style={{
                    flex: "0 0 auto",
                    fontSize: 15,
                    color: "var(--accent)",
                    paddingTop: 4,
                    transform: `translateX(${on ? "8px" : "0px"})`,
                    transition: "transform .35s ease",
                  }}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured work */}
      <section
        data-work="1"
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(44px, 6vw, 88px) clamp(18px, 4.5vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(24px, 3vw, 40px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(30px, 4.4vw, 62px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Selected fragments
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <Link
            href="/work"
            className="mono hover-accent"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              color: "var(--ink)",
              textDecoration: "none",
              transition: "color .3s ease, border-color .3s ease",
            }}
          >
            All work →
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(14px, 1.8vw, 26px)",
          }}
        >
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              flex={FEATURED_FLEX[i] ?? "1 1 300px"}
            />
          ))}
        </div>
      </section>

      {/* Process */}
      <section
        data-proc="1"
        style={{
          background: "var(--dark)",
          color: "var(--ondark)",
          padding: "clamp(48px, 7vw, 104px) 0",
          marginTop: "clamp(20px, 3vw, 40px)",
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
              gap: 24,
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(34px, 5vw, 66px)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4.2vw, 58px)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                fontWeight: 500,
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              From first fragment to finished system
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                color: "rgba(var(--ondark-rgb),0.4)",
              }}
            >
              02 / PROCESS
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 7,
                height: 1,
                background: "rgba(var(--ondark-rgb),0.18)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 7,
                height: 1,
                background: "var(--accent)",
                width: procWidth,
                transition: "width .6s cubic-bezier(.2,.7,.2,1)",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "clamp(20px, 3vw, 40px)",
              }}
            >
              {steps.map((s, i) => {
                const on = proc > i;
                return (
                  <div
                    key={s.num}
                    style={{
                      paddingTop: 0,
                      opacity: on ? 1 : 0.34,
                      transition: "opacity .5s ease",
                    }}
                  >
                    <span
                      style={{
                        width: 15,
                        height: 15,
                        display: "block",
                        border: `1px solid ${on ? "var(--accent)" : "rgba(var(--ondark-rgb),0.4)"}`,
                        background: on ? "var(--accent)" : "transparent",
                        transform: "rotate(45deg) translateY(0)",
                        marginBottom: 26,
                        transition: "background .5s ease, border-color .5s ease",
                      }}
                    />
                    <div
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.18em",
                        color: "var(--accent)",
                        marginBottom: 10,
                      }}
                    >
                      {s.num}
                    </div>
                    <h3
                      style={{
                        margin: "0 0 10px",
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(var(--ondark-rgb),0.6)",
                        maxWidth: "30ch",
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(46px, 6vw, 92px) clamp(18px, 4.5vw, 64px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(24px, 3vw, 42px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(30px, 4.4vw, 62px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 500,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            The people behind the fragments
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <Link
            href="/team"
            className="mono hover-accent"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Meet the team →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))",
            gap: "clamp(12px, 1.6vw, 22px)",
          }}
        >
          {team.map((p, i) => (
            <Link
              key={p.name}
              href="/team"
              style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--ink-rgb),0.1)",
                }}
              >
                <TeamPhoto member={p} num={`0${i + 1}`} />
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 15.5,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.name}
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 4,
                  fontSize: 9.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mono)",
                }}
              >
                {p.role}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--accent)",
          color: "var(--ondark)",
          margin: "0 clamp(0px, 1vw, 16px)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
          <ParticleCanvas mode="cta" />
        </div>
        <div
          style={{
            position: "relative",
            maxWidth: 1480,
            margin: "0 auto",
            padding: "clamp(56px, 9vw, 130px) clamp(18px, 4.5vw, 64px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "rgba(var(--ondark-rgb),0.75)",
              }}
            >
              03 / NEXT
            </span>
            <h2
              style={{
                fontSize: "clamp(34px, 6vw, 84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: "22px 0 18px",
                maxWidth: "20ch",
              }}
            >
              Have a fragment of an idea?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(15.5px, 1.3vw, 20px)",
                lineHeight: 1.5,
                color: "var(--ondark)",
                maxWidth: "34ch",
              }}
            >
              Let&apos;s turn it into something real.
            </p>
          </div>
          <Link
            href="/contact"
            className="mono btn-invert"
            style={{
              fontSize: 11.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "18px 26px",
              textDecoration: "none",
              background: "var(--bg)",
            }}
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </main>
  );
}

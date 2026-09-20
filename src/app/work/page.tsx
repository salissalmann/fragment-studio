"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { CATS, projects } from "@/lib/data";

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof CATS)[number]>("ALL");

  const filtered = useMemo(() => {
    const list =
      filter === "ALL"
        ? projects
        : projects.filter((p) => p.cats.includes(filter));
    return list;
  }, [filter]);

  return (
    <main>
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(40px, 7vw, 100px) clamp(18px, 4.5vw, 64px) clamp(24px, 3vw, 40px)",
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
            PORTFOLIO
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
          Things we&apos;ve built
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(20px, 3vw, 34px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            borderTop: "1px solid rgba(var(--ink-rgb),0.14)",
            paddingTop: 22,
          }}
        >
          {CATS.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`mono chip-hover${active ? " is-active" : ""}`}
                data-active={active ? "true" : "false"}
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  padding: "9px 14px",
                  cursor: "pointer",
                  border: active
                    ? "1px solid var(--ink)"
                    : "1px solid rgba(var(--ink-rgb),0.2)",
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "var(--bg)" : "var(--muted)",
                  transition:
                    "background .25s ease, color .25s ease, border-color .25s ease",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(40px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(14px, 1.8vw, 26px)",
          }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} flex="1 1 320px" />
          ))}
        </div>
      </section>
    </main>
  );
}

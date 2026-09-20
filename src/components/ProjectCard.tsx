"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { getUpworkCase } from "@/lib/data";
import { ContainBlurImage } from "@/components/ContainBlurImage";
import { ExamoraCover } from "@/components/ExamoraCover";

const ACCENT = "var(--accent)";

type ProjectCardProps = {
  project: Project;
  flex?: string;
};

function tilesFor(project: Project, hot: boolean) {
  return Array.from({ length: 9 }, (_, i) => {
    const seed = (i * 7 + project.name.length * 3) % 9;
    const accent = hot ? seed < 4 : seed < 2;
    return accent
      ? ACCENT
      : seed < 5
        ? "rgba(var(--ink-rgb),0.78)"
        : "rgba(var(--ink-rgb),0.22)";
  });
}

export function ProjectCard({ project, flex = "1 1 300px" }: ProjectCardProps) {
  const [hot, setHot] = useState(false);
  const tiles = tilesFor(project, hot);
  const isExamora = project.slug === "examora";
  const cover = !isExamora ? getUpworkCase(project.slug)?.cover : undefined;

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      style={{
        flex,
        minWidth: 0,
        cursor: "pointer",
        border: "1px solid rgba(var(--ink-rgb),0.14)",
        background: hot ? "var(--panel2)" : "var(--bg)",
        padding: "clamp(16px, 1.8vw, 26px)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        transition: "background .4s ease, border-color .4s ease",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "var(--accent)",
          }}
        >
          {project.cat}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "var(--faint)",
          }}
        >
          {project.year}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--tile)",
          width: "100%",
          height: "clamp(210px, 36vw, 320px)",
          flex: "0 0 auto",
        }}
      >
        {isExamora ? (
          <ExamoraCover hot={hot} label="EXAMORA" />
        ) : cover ? (
          <ContainBlurImage
            src={cover}
            alt={`${project.name} cover`}
            sizes="(max-width: 700px) 100vw, 40vw"
            scale={hot ? 1.03 : 1}
          />
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.6,
                backgroundImage:
                  "linear-gradient(rgba(var(--ink-rgb),0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--ink-rgb),0.07) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 7,
                  transform: `translateY(${hot ? "-8px" : "0px"}) rotate(${hot ? "-3deg" : "0deg"})`,
                  transition: "transform .6s cubic-bezier(.2,.7,.2,1)",
                }}
              >
                {tiles.map((color, i) => (
                  <span
                    key={i}
                    style={{
                      width: "clamp(16px, 2.4vw, 30px)",
                      height: "clamp(16px, 2.4vw, 30px)",
                      display: "block",
                      background: color,
                      transition: "background .5s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ minWidth: 0, flex: "1 1 auto" }}>
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(21px, 2.4vw, 32px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: hot ? "var(--accent)" : "var(--ink)",
              transition: "color .35s ease",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 14.5,
              lineHeight: 1.55,
              color: "var(--muted)",
              maxWidth: "44ch",
            }}
          >
            {project.desc}
          </p>
        </div>
        <span
          className="mono"
          style={{
            fontSize: 15,
            color: "var(--accent)",
            transform: `translateX(${hot ? "8px" : "0px"})`,
            transition: "transform .35s ease",
          }}
        >
          →
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 7,
          borderTop: "1px solid rgba(var(--ink-rgb),0.1)",
          paddingTop: 14,
          marginTop: "auto",
        }}
      >
        {project.tech.map((t) => (
          <span
            key={t}
            className="mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.12em",
              color: "var(--mono)",
              border: "1px solid rgba(var(--ink-rgb),0.14)",
              padding: "5px 8px",
              display: "inline-block",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

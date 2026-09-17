"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ACCENT = "var(--accent)";

const GLYPHS: Record<string, string[]> = {
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
};

const WORD = ["F", "R", "A", "G", "M", "E", "N", "T"];
const HOLD = 10;

type Cell = { bg: string; op: number; dx: string };

function buildCells(phase: number): { cells: Cell[]; letter: string; glitching: boolean } {
  const letter = WORD[Math.floor(phase / HOLD) % WORD.length];
  const sub = phase % HOLD;
  const glitching = sub < 3;
  const rows = GLYPHS[letter];
  const noise = (n: number) => (Math.sin(n * 12.9898 + phase * 4.1) * 43758.5453) % 1;
  const cells: Cell[] = [];

  for (let r = 0; r < 7; r++) {
    const rn = Math.abs(noise(r * 3 + 1));
    const tear = glitching && rn > 0.55;
    const shift = tear ? (rn > 0.8 ? 1 : -1) : 0;
    for (let c = 0; c < 5; c++) {
      let on = rows[r][c] === "1";
      const cn = Math.abs(noise(r * 7 + c * 13));
      if (glitching && cn > 0.88) on = !on;
      const acc =
        on &&
        ((glitching && cn > 0.7) || (!glitching && r === Math.floor(phase / 2) % 7));
      cells.push({
        bg: on
          ? acc
            ? ACCENT
            : "rgba(var(--ink-rgb),0.9)"
          : "rgba(var(--ink-rgb),0.07)",
        op: tear ? 0.45 : 1,
        dx: `${shift * 22}%`,
      });
    }
  }

  return { cells, letter, glitching };
}

export function HeroGlyph() {
  const [phase, setPhase] = useState(0);
  const visibleRef = useRef(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) return;

    const grid = gridRef.current;
    let io: IntersectionObserver | null = null;
    if (grid) {
      io = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(grid);
    }

    const id = setInterval(() => {
      if (!visibleRef.current) return;
      const el = gridRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      setPhase((p) => (p + 1) % 80);
    }, 130);

    return () => {
      clearInterval(id);
      io?.disconnect();
    };
  }, []);

  const { cells, letter, glitching } = useMemo(() => buildCells(phase), [phase]);

  return (
    <div
      style={{
        position: "relative",
        background: "var(--raise)",
        border: "1px solid rgba(var(--ink-rgb),0.12)",
        padding: "clamp(14px, 2vw, 22px)",
        overflow: "hidden",
      }}
    >
      <div
        ref={gridRef}
        data-hero-grid="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "clamp(3px, 0.6vw, 6px)",
          maxWidth: 268,
          margin: "0 auto",
        }}
      >
        {cells.map((c, i) => (
          <span
            key={i}
            style={{
              aspectRatio: "1/1",
              display: "block",
              background: c.bg,
              opacity: c.op,
              transform: `translateX(${c.dx})`,
              transition:
                "background .09s linear, opacity .09s linear, transform .09s linear",
            }}
          />
        ))}
      </div>
      <div
        className="mono"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: "clamp(12px, 1.6vw, 18px)",
          fontSize: 9.5,
          letterSpacing: "0.22em",
          color: "var(--faint)",
        }}
      >
        <span>FRAGMENT / {letter}</span>
        <span style={{ color: "var(--accent)" }}>
          {glitching ? "SIGNAL / UNSTABLE" : "SIGNAL / LOCKED"}
        </span>
      </div>
    </div>
  );
}

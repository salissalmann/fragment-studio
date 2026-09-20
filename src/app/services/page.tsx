"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContainBlurImage } from "@/components/ContainBlurImage";
import {
  LAYOUT,
  LINKS,
  serviceDetail,
  tech,
  upworkCases,
} from "@/lib/data";

function visibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(max-width: 640px)").matches) return 1;
  if (window.matchMedia("(max-width: 980px)").matches) return 2;
  return 3;
}

function UpworkGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    active: boolean;
    startX: number;
    scroll: number;
    moved: boolean;
  }>({
    active: false,
    startX: 0,
    scroll: 0,
    moved: false,
  });
  const [grabbing, setGrabbing] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [perView, setPerView] = useState(3);

  const layoutCards = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const n = visibleCount();
    setPerView(n);
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
    const cardW = (el.clientWidth - gap * (n - 1)) / n;
    for (const child of Array.from(el.children) as HTMLElement[]) {
      child.style.flex = `0 0 ${cardW}px`;
      child.style.width = `${cardW}px`;
      child.style.maxWidth = `${cardW}px`;
    }
    const total = Math.max(1, Math.ceil(upworkCases.length / n));
    setPages(total);
    const pageW = el.clientWidth + gap;
    setPage(
      Math.min(total - 1, Math.round(el.scrollLeft / Math.max(1, pageW))),
    );
  }, []);

  const syncPage = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const n = visibleCount();
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
    const pageW = el.clientWidth + gap;
    const total = Math.max(1, Math.ceil(upworkCases.length / n));
    setPages(total);
    setPage(
      Math.min(total - 1, Math.round(el.scrollLeft / Math.max(1, pageW))),
    );
  }, []);

  const scrollByPage = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    layoutCards();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => layoutCards());
    ro.observe(el);
    window.addEventListener("resize", layoutCards);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layoutCards);
    };
  }, [layoutCards]);

  return (
    <section
      style={{
        borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
        background: "var(--dark)",
        color: "var(--ondark)",
        padding: "clamp(48px, 7vw, 100px) 0",
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
            marginBottom: "clamp(24px, 3.5vw, 40px)",
          }}
        >
          <div style={{ minWidth: 0, flex: "1 1 240px" }}>
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "var(--accent)",
              }}
            >
              UPWORK · DELIVERED
            </span>
            <h2
              style={{
                margin: "14px 0 0",
                fontSize: "clamp(28px, 4.4vw, 58px)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                fontWeight: 500,
                maxWidth: "18ch",
              }}
            >
              Proof from the field
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flex: "0 0 auto",
            }}
          >
            <p
              className="upwork-hint mono"
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "rgba(var(--ondark-rgb),0.45)",
              }}
            >
              {perView} PER VIEW · SCROLL
            </p>
            <button
              type="button"
              className="mono upwork-nav-btn"
              aria-label="Previous projects"
              onClick={() => scrollByPage(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="mono upwork-nav-btn"
              aria-label="Next projects"
              onClick={() => scrollByPage(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="upwork-scroller-wrap">
        <div
          ref={scrollerRef}
          className="upwork-scroller"
          onScroll={syncPage}
          onPointerDown={(e) => {
            const el = scrollerRef.current;
            if (!el) return;
            if ((e.target as HTMLElement).closest("a,button")) return;
            drag.current = {
              active: true,
              startX: e.clientX,
              scroll: el.scrollLeft,
              moved: false,
            };
            setGrabbing(true);
            el.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current.active || !scrollerRef.current) return;
            const dx = e.clientX - drag.current.startX;
            if (Math.abs(dx) > 6) drag.current.moved = true;
            scrollerRef.current.scrollLeft = drag.current.scroll - dx;
          }}
          onPointerUp={() => {
            drag.current.active = false;
            setGrabbing(false);
          }}
          onPointerCancel={() => {
            drag.current.active = false;
            setGrabbing(false);
          }}
          style={{ cursor: grabbing ? "grabbing" : "grab" }}
        >
        {upworkCases.map((c, i) => {
          const inner = (
            <div data-upwork-card className="upwork-card">
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "var(--accent)",
                }}
              >
                {String(i + 1).padStart(2, "0")} · {c.tag}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(18px, 2.2vw, 26px)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                {c.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(13px, 1.1vw, 14.5px)",
                  lineHeight: 1.5,
                  color: "rgba(var(--ondark-rgb),0.55)",
                }}
              >
                {c.blurb}
              </p>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1420 / 1080",
                  overflow: "hidden",
                  border: "1px solid rgba(var(--ondark-rgb),0.14)",
                  background: "#0a0a0a",
                }}
              >
                <ContainBlurImage
                  src={c.cover}
                  alt={`${c.name} cover`}
                  draggable={false}
                  sizes="(max-width: 640px) 86vw, (max-width: 980px) 45vw, 30vw"
                />
                <span
                  className="mono"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 12,
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "rgba(250,249,244,0.7)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  }}
                >
                  COVER
                </span>
              </div>
              {c.images.length > 0 && (
                <div className="upwork-card-shots">
                  {c.images.slice(0, 3).map((src, j) => (
                    <div
                      key={src}
                      style={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        border: "1px solid rgba(var(--ondark-rgb),0.12)",
                        background: "#0a0a0a",
                      }}
                    >
                      <ContainBlurImage
                        src={src}
                        alt={`${c.name} screenshot ${j + 1}`}
                        draggable={false}
                        sizes="120px"
                        objectPosition="center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

          return c.href ? (
            <Link
              key={c.slug}
              href={c.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                minWidth: 0,
                display: "block",
              }}
              draggable={false}
              onClick={(e) => {
                if (drag.current.moved) e.preventDefault();
              }}
            >
              {inner}
            </Link>
          ) : (
            <div key={c.slug} style={{ minWidth: 0 }}>
              {inner}
            </div>
          );
        })}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1480,
          margin: "18px auto 0",
          padding: "0 clamp(18px, 4.5vw, 64px)",
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            }}
            style={{
              width: i === page ? 22 : 8,
              height: 8,
              padding: 0,
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              background:
                i === page ? "var(--accent)" : "rgba(var(--ondark-rgb),0.28)",
              transition: "width .25s ease, background .25s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [assembled, setAssembled] = useState(false);
  const [hotTech, setHotTech] = useState<string | null>(null);

  const nodes = useMemo(() => {
    return tech.map((n) => {
      const L = LAYOUT[n.id];
      const active = assembled;
      const isHot =
        hotTech === n.id ||
        (!!hotTech &&
          LINKS.some(
            (l) =>
              (l[0] === hotTech && l[1] === n.id) ||
              (l[1] === hotTech && l[0] === n.id),
          ));
      return {
        id: n.id,
        label: n.label,
        left: `${active ? L[0] : n.sx}%`,
        top: `${active ? L[1] : n.sy}%`,
        color:
          isHot || (active && hotTech === null)
            ? "var(--accent)"
            : "rgba(var(--ink-rgb),0.2)",
        ink: isHot ? "var(--bg)" : "var(--ink)",
        bg: isHot ? "var(--ink)" : "var(--bg)",
      };
    });
  }, [assembled, hotTech]);

  const links = useMemo(() => {
    return LINKS.map((l) => {
      const a = LAYOUT[l[0]];
      const b = LAYOUT[l[1]];
      const isHot = hotTech === l[0] || hotTech === l[1];
      return {
        key: `${l[0]}-${l[1]}`,
        x1: `${a[0]}%`,
        y1: `${a[1]}%`,
        x2: `${b[0]}%`,
        y2: `${b[1]}%`,
        stroke: isHot ? "var(--accent)" : "rgba(var(--ink-rgb),0.3)",
        op: assembled ? (isHot ? 1 : 0.55) : 0,
        w: isHot ? 1.6 : 1,
      };
    });
  }, [assembled, hotTech]);

  return (
    <main>
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(40px, 7vw, 100px) clamp(18px, 4.5vw, 64px) clamp(30px, 4vw, 56px)",
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
            SERVICES
          </span>
        </div>
        <h1
          style={{
            fontSize: "clamp(42px, 7.6vw, 118px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          We engineer what comes next
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "clamp(22px, 3vw, 34px) 0 0",
            fontSize: "clamp(15.5px, 1.25vw, 19px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "52ch",
          }}
        >
          Five disciplines, one engineering team. We are hired when a product
          needs architecture, not just implementation.
        </p>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(20px, 3vw, 40px) clamp(18px, 4.5vw, 64px) clamp(44px, 6vw, 80px)",
          animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(var(--ink-rgb),0.14)",
            background: "linear-gradient(var(--raise), var(--panel2))",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px clamp(14px, 2vw, 22px)",
              borderBottom: "1px solid rgba(var(--ink-rgb),0.12)",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--mono)",
              }}
            >
              FRAGMENT → SYSTEM · INTERACTIVE
            </span>
            <button
              type="button"
              className="mono btn-invert"
              onClick={() => {
                setAssembled((a) => !a);
                setHotTech(null);
              }}
              style={{
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "9px 14px",
                cursor: "pointer",
              }}
            >
              {assembled ? "Reset fragments" : "Assemble system"}
            </button>
          </div>
          <div
            style={{
              position: "relative",
              height: "clamp(360px, 52vw, 560px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(var(--ink-rgb),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--ink-rgb),0.05) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
              preserveAspectRatio="none"
            >
              {links.map((l) => (
                <line
                  key={l.key}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke={l.stroke}
                  strokeWidth={l.w}
                  opacity={l.op}
                  style={{ transition: "opacity .5s ease, stroke .35s ease" }}
                />
              ))}
            </svg>
            {nodes.map((n) => (
              <div
                key={n.id}
                onMouseEnter={() => {
                  setHotTech(n.id);
                  setAssembled(true);
                }}
                onMouseLeave={() => setHotTech(null)}
                className="mono"
                style={{
                  position: "absolute",
                  left: n.left,
                  top: n.top,
                  transform: "translate(-50%, -50%)",
                  transition:
                    "left .8s cubic-bezier(.2,.7,.2,1), top .8s cubic-bezier(.2,.7,.2,1), background .3s ease, color .3s ease, border-color .3s ease",
                  border: `1px solid ${n.color}`,
                  background: n.bg,
                  color: n.ink,
                  padding: "10px 14px",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  cursor: "crosshair",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </div>
            ))}
            <div
              className="mono"
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                fontSize: 9.5,
                letterSpacing: "0.16em",
                color: "var(--faint)",
              }}
            >
              HOVER A FRAGMENT TO TRACE ITS CONNECTIONS
            </div>
          </div>
        </div>
      </section>

      {serviceDetail.map((s, i) => {
        const bg = i % 2 === 1 ? "var(--panel2)" : "var(--bg)";
        return (
          <section
            key={s.num}
            style={{
              background: bg,
              borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
              animation: "fragUp .75s cubic-bezier(.2,.7,.2,1) both",
            }}
          >
            <div
              style={{
                maxWidth: 1480,
                margin: "0 auto",
                padding: "clamp(36px, 5vw, 74px) clamp(18px, 4.5vw, 64px)",
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(24px, 4vw, 64px)",
              }}
            >
              <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.18em",
                    color: "var(--accent)",
                  }}
                >
                  {s.num}
                </span>
                <h2
                  style={{
                    margin: "16px 0 14px",
                    fontSize: "clamp(28px, 4vw, 54px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.035em",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    maxWidth: "34ch",
                  }}
                >
                  {s.lead}
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 300px",
                  minWidth: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 1,
                  background: "rgba(var(--ink-rgb),0.14)",
                  alignSelf: "flex-start",
                }}
              >
                {s.items.map((item) => (
                  <div
                    key={item}
                    className="svc-item"
                    style={{
                      background: bg,
                      padding: "16px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        background: "var(--accent)",
                        display: "block",
                        flex: "0 0 auto",
                      }}
                    />
                    <span style={{ fontSize: 14, letterSpacing: "-0.005em" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 80px) clamp(18px, 4.5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(26px, 3.6vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            maxWidth: "24ch",
          }}
        >
          Tell us which fragment you are missing
          <span style={{ color: "var(--accent)" }}>.</span>
        </h2>
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
      </section>

      {/* Very end — horizontal movable gallery */}
      <UpworkGallery />
    </main>
  );
}

"use client";

type ProjectCoverProps = {
  name: string;
  hot?: boolean;
  label?: string;
  /** Fill a sized parent (`position: relative`) */
  fill?: boolean;
};

/** On-brand Examora cover — B/W site language, orange wordmark */
export function ExamoraCover({
  hot = false,
  label = "COVER",
  fill = true,
}: Omit<ProjectCoverProps, "name">) {
  return (
    <div
      style={{
        position: fill ? "absolute" : "relative",
        inset: fill ? 0 : undefined,
        width: fill ? undefined : "100%",
        height: fill ? undefined : "100%",
        minHeight: fill ? undefined : 220,
        overflow: "hidden",
        background: "var(--tile)",
      }}
    >
      {/* site grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          backgroundImage:
            "linear-gradient(rgba(var(--ink-rgb),0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--ink-rgb),0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* soft vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 20%, rgba(var(--ink-rgb),0.06) 100%)",
        }}
      />
      {/* faint watermark */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(42px, 8vw, 96px)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          color: "rgba(var(--ink-rgb),0.06)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        EXAMORA
      </span>
      {/* geometric bars — Fragment language */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "38%",
          transform: `translate(-50%, -50%) translateY(${hot ? "-6px" : "0"})`,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          transition: "transform .55s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {[
          { h: 52, c: "rgba(var(--ink-rgb),0.75)" },
          { h: 34, c: "#e86a1a" },
          { h: 68, c: "rgba(var(--ink-rgb),0.28)" },
          { h: 44, c: "rgba(var(--ink-rgb),0.75)" },
        ].map((b, i) => (
          <span
            key={i}
            style={{
              width: 14,
              height: b.h,
              display: "block",
              background: b.c,
            }}
          />
        ))}
      </div>
      {/* orange wordmark */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "58%",
          textAlign: "center",
          transform: `translateY(${hot ? "-4px" : "0"})`,
          transition: "transform .55s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <span
          style={{
            fontSize: "clamp(28px, 4.2vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            color: "#e86a1a",
          }}
        >
          EXAMORA
        </span>
        <div
          className="mono"
          style={{
            marginTop: 10,
            fontSize: 9.5,
            letterSpacing: "0.18em",
            color: "var(--faint)",
          }}
        >
          ENGINEERING ENTRANCE
        </div>
      </div>
      <span
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
        {label}
      </span>
    </div>
  );
}

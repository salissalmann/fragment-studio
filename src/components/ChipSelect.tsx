"use client";

type ChipSelectProps = {
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function ChipSelect({
  options,
  value,
  onChange,
  className,
}: ChipSelectProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
      role="group"
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`mono chip-hover${active ? " is-active" : ""}`}
            data-active={active ? "true" : "false"}
            style={{
              fontSize: 10.5,
              letterSpacing: "0.1em",
              padding: "11px 14px",
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
            {opt}
          </button>
        );
      })}
    </div>
  );
}

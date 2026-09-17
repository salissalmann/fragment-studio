import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 1480,
        margin: "0 auto",
        padding:
          "clamp(80px, 14vw, 160px) clamp(18px, 4.5vw, 64px) clamp(60px, 10vw, 120px)",
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
          404
        </span>
      </div>
      <h1
        style={{
          fontSize: "clamp(42px, 7.6vw, 118px)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          fontWeight: 500,
          margin: 0,
          maxWidth: "14ch",
        }}
      >
        Fragment not found
        <span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <p
        style={{
          margin: "clamp(20px, 3vw, 32px) 0 clamp(28px, 4vw, 42px)",
          fontSize: "clamp(15.5px, 1.25vw, 19px)",
          lineHeight: 1.6,
          color: "var(--muted)",
          maxWidth: "40ch",
        }}
      >
        This page doesn&apos;t exist — or it hasn&apos;t been assembled yet.
      </p>
      <Link
        href="/"
        className="mono btn-fill"
        style={{
          fontSize: 11.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "16px 24px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Back home →
      </Link>
    </main>
  );
}

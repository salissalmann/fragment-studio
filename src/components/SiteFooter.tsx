import Link from "next/link";
import { NAV_ITEMS, SOCIAL } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(var(--ink-rgb),0.14)",
        marginTop: "clamp(40px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "clamp(36px, 5vw, 72px) clamp(18px, 4.5vw, 64px) 26px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px, 5vw, 70px)",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div
              style={{
                fontSize: "clamp(42px, 8vw, 108px)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              FRAGMENT
              <span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <p
              style={{
                margin: "18px 0 0",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "34ch",
              }}
            >
              Software, AI &amp; systems for ambitious teams.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "clamp(30px, 5vw, 76px)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  color: "var(--faint)",
                  marginBottom: 4,
                }}
              >
                SITE
              </span>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover-accent"
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink)",
                    transition: "color .25s ease",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  color: "var(--faint)",
                  marginBottom: 4,
                }}
              >
                SOCIAL
              </span>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-accent"
                style={{ fontSize: 14.5, color: "var(--ink)" }}
              >
                LinkedIn ↗
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-accent"
                style={{ fontSize: 14.5, color: "var(--ink)" }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div
          className="mono"
          style={{
            marginTop: "clamp(30px, 4vw, 56px)",
            paddingTop: 18,
            borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "space-between",
            fontSize: 9.5,
            letterSpacing: "0.14em",
            color: "var(--faint)",
          }}
        >
          <span>© 2026 FRAGMENT. ALL RIGHTS RESERVED.</span>
          <span>FRAGMENT → SYSTEM → PRODUCT</span>
        </div>
      </div>
    </footer>
  );
}

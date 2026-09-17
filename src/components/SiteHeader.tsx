"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { useTheme } from "./ThemeProvider";

type SiteHeaderProps = {
  onMenuOpen: () => void;
};

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ onMenuOpen }: SiteHeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled((window.scrollY || 0) > 12);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        backdropFilter: "blur(16px) saturate(1.1)",
        WebkitBackdropFilter: "blur(16px) saturate(1.1)",
        background: "var(--nav-bg)",
      }}
    >
      <div
        style={{
          height: 1,
          width: "100%",
          background: "rgba(var(--ink-rgb),0.9)",
          opacity: scrolled ? 0.14 : 0,
          transition: "opacity .4s ease",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      />
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px)",
          height: "clamp(64px, 7vw, 84px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            userSelect: "none",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              fontSize: "clamp(15px, 1.3vw, 18px)",
              fontWeight: 600,
              letterSpacing: "0.17em",
            }}
          >
            FRAGMENT
          </span>
          <span
            style={{
              width: 5,
              height: 5,
              background: "var(--accent)",
              display: "block",
            }}
          />
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2.4vw, 38px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 2.4vw, 34px)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = pathMatches(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mono nav-link hover-accent"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--ink)",
                    transition: "color .25s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-theme-btn="1"
            className="hover-accent"
            style={{
              background: "transparent",
              border: "1px solid rgba(var(--ink-rgb),0.24)",
              color: "var(--ink)",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
              transition: "border-color .25s ease, color .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(var(--ink-rgb),0.24)";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            {isDark ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
              </svg>
            )}
          </button>

          <Link
            href="/contact"
            className="mono nav-cta btn-invert"
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "10px 16px",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
          >
            Start a project →
          </Link>

          <button
            type="button"
            onClick={onMenuOpen}
            aria-label="Open menu"
            className="burger"
            style={{
              flexDirection: "column",
              gap: 5,
              cursor: "pointer",
              padding: "8px 0",
              background: "transparent",
              border: "none",
            }}
          >
            <span
              style={{
                width: 26,
                height: 1.5,
                background: "var(--ink)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 26,
                height: 1.5,
                background: "var(--accent)",
                display: "block",
              }}
            />
          </button>
        </nav>
      </div>
    </header>
  );
}

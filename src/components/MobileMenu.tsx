"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  ...NAV_ITEMS,
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "var(--dark)",
        color: "var(--ondark)",
        padding: "clamp(22px, 6vw, 56px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.18em",
          }}
        >
          FRAGMENT
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            cursor: "pointer",
            border: "1px solid rgba(var(--ondark-rgb),0.3)",
            padding: "10px 14px",
            background: "transparent",
            color: "var(--ondark)",
          }}
        >
          CLOSE ✕
        </button>
      </div>

      <nav
        aria-label="Mobile"
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        {MENU_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              padding: "10px 0",
              borderBottom: "1px solid rgba(var(--ondark-rgb),0.12)",
              color: "var(--ondark)",
              animation: "fragDrop .4s ease both",
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--accent)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontSize: "clamp(30px, 9vw, 52px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.16em",
          color: "rgba(var(--ondark-rgb),0.45)",
        }}
      >
        SOFTWARE · AI · SYSTEMS
      </div>
    </div>
  );
}

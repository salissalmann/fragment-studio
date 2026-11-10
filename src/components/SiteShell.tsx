"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { MobileMenu } from "./MobileMenu";
import { SiteFooter } from "./SiteFooter";

/** Standalone pages render without the studio header and footer. */
const BARE_ROUTES = ["/reel"];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  if (BARE_ROUTES.includes(pathname)) {
    return <div style={{ minHeight: "100vh", background: "var(--bg)" }}>{children}</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <a href="#content" className="skip-to-content">
        Skip to content
      </a>
      <SiteHeader onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div id="content">{children}</div>
      <SiteFooter />
    </div>
  );
}

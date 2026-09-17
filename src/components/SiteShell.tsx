"use client";

import { useState, type ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { MobileMenu } from "./MobileMenu";
import { SiteFooter } from "./SiteFooter";

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <SiteHeader onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <SiteFooter />
    </div>
  );
}

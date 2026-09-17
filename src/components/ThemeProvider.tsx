"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("fragment-theme", theme);
  } catch {
    /* ignore */
  }
}

function readInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("fragment-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const initial = readInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const btn = document.querySelector<HTMLElement>("[data-theme-btn]");
    const swap = () => {
      applyTheme(next);
      setTheme(next);
    };

    const startVT = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;

    if (!startVT || reduced || !btn) {
      swap();
      return;
    }

    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const rad = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    startVT
      .call(document, swap)
      .ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${rad}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 680,
            easing: "cubic-bezier(.4,0,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
  }, [theme, reduced]);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

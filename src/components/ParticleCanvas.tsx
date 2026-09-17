"use client";

import { useEffect, useRef } from "react";
import { ACCENT_HEX } from "@/lib/data";

type ParticleCanvasProps = {
  mode: "cta" | "hero";
  className?: string;
  density?: number;
  motion?: "drift" | "orbit" | "still";
};

type Pt = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  tx: number;
  ty: number;
};

export function ParticleCanvas({
  mode,
  className,
  density = 46,
  motion = "drift",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let anim = 0;
    let disposed = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const n = mode === "hero" ? Math.max(12, Math.min(90, density)) : 34;
    const mouse = { x: -999, y: -999 };

    let w = 1;
    let h = 1;
    let pts: Pt[] = [];
    let ctx: CanvasRenderingContext2D | null = null;

    const resize = () => {
      const r = el.getBoundingClientRect();
      w = Math.max(r.width, 1);
      h = Math.max(r.height, 1);
      el.width = w * dpr;
      el.height = h * dpr;
      ctx = el.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        s: Math.random() < 0.18 ? 6 + Math.random() * 7 : 2 + Math.random() * 2.4,
        tx: w / 2 + (Math.random() - 0.5) * w * 0.42,
        ty: h / 2 + (Math.random() - 0.5) * h * 0.5,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    resize();

    if (mode === "hero") {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    const draw = (t: number) => {
      if (disposed || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      const dark = mode === "cta";
      const ink = dark ? "250,249,244" : "23,20,15";

      pts.forEach((p) => {
        if (mode === "cta") {
          p.x += (p.tx - p.x) * 0.004 + Math.sin(t / 2600 + p.ty) * 0.06;
          p.y += (p.ty - p.y) * 0.004;
        } else if (motion === "orbit") {
          p.x += Math.cos(t / 3000 + p.y * 0.01) * 0.5;
          p.y += Math.sin(t / 3400 + p.x * 0.01) * 0.5;
        } else if (motion !== "still") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const lim = mode === "cta" ? 96 : 112;
          if (d < lim) {
            ctx.strokeStyle = `rgba(${ink},${(0.16 * (1 - d / lim)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = dm < 170;
        if (near) {
          ctx!.strokeStyle = `rgba(205,92,92,${(0.5 * (1 - dm / 170)).toFixed(3)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
        const s = p.s * (near ? 1.5 : 1);
        ctx!.fillStyle = near
          ? ACCENT_HEX
          : dark
            ? "rgba(250,249,244,0.72)"
            : "rgba(23,20,15,0.62)";
        ctx!.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      });

      if (mouse.x > -100) {
        ctx.strokeStyle = "rgba(205,92,92,0.6)";
        ctx.lineWidth = 1;
        ctx.strokeRect(mouse.x - 7, mouse.y - 7, 14, 14);
      }

      if (!reduced && motion !== "still") {
        anim = requestAnimationFrame(draw);
      }
    };

    if (reduced || motion === "still") {
      draw(0);
    } else {
      anim = requestAnimationFrame(draw);
    }

    const onResize = () => {
      if (anim) cancelAnimationFrame(anim);
      resize();
      if (reduced || motion === "still") {
        draw(0);
      } else {
        anim = requestAnimationFrame(draw);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      disposed = true;
      if (anim) cancelAnimationFrame(anim);
      window.removeEventListener("resize", onResize);
      if (mode === "hero") {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [mode, density, motion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      data-hero={mode === "hero" ? "1" : undefined}
      data-cta={mode === "cta" ? "1" : undefined}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

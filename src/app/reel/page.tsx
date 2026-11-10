"use client";

import { useRef, useState } from "react";

const VIDEO_SRC = "/reel/salis-salman-reel.mp4";
const POSTER_SRC = "/reel/poster.jpg";

const UPWORK_URL = "https://www.upwork.com/freelancers/~0184f7f54158c6f5f8";
const LINKEDIN_URL = "https://www.linkedin.com/in/salis-salman";

const UPWORK_PATH =
  "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z";
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const links = [
  { label: "Upwork", href: UPWORK_URL, path: UPWORK_PATH, brand: "#14a800" },
  { label: "LinkedIn", href: LINKEDIN_URL, path: LINKEDIN_PATH, brand: "#0a66c2" },
];

export default function ReelPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };

  return (
    <main className="rl">
      <h1 className="rl-name" aria-label="Salis Salman">
        <span aria-hidden="true">SALIS</span>
        <span aria-hidden="true">SALMAN</span>
      </h1>

      <div className={`rl-name rl-name-over${playing ? " is-hidden" : ""}`} aria-hidden="true">
        <span>SALIS</span>
        <span>SALMAN</span>
      </div>

      <div className="rl-stage">
        <div className="rl-player">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            playsInline
            preload="metadata"
            controls={playing}
            onEnded={() => setPlaying(false)}
            aria-label="Salis Salman intro reel"
          />
          {!playing && (
            <button
              type="button"
              className="rl-play"
              onClick={start}
              aria-label="Play the reel with sound"
            >
              <span className="rl-play-disc">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15a.8.8 0 0 0 1.2.7l12-7.5a.8.8 0 0 0 0-1.4l-12-7.5A.8.8 0 0 0 7 4.5Z" />
                </svg>
              </span>
              <span className="mono">PLAY · 0:59</span>
            </button>
          )}
        </div>

        <nav className="rl-links" aria-label="Profiles">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rl-link"
              style={{ ["--brand" as string]: l.brand }}
              aria-label={`Salis Salman on ${l.label}`}
            >
              <span className="rl-link-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d={l.path} />
                </svg>
              </span>
              <span className="rl-link-label mono">{l.label.toUpperCase()}</span>
            </a>
          ))}
        </nav>
      </div>

      <p className="rl-foot mono">FULL-STACK ENGINEER · INTRO REEL</p>
    </main>
  );
}

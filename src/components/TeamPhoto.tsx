import Image from "next/image";
import type { TeamMember } from "@/lib/data";

type TeamPhotoProps = {
  member: TeamMember;
  /** Accent number overlay, e.g. "01" */
  num?: string;
  label?: string;
};

export function TeamPhoto({ member, num, label }: TeamPhotoProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "var(--tile)",
        overflow: "hidden",
      }}
    >
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes="(max-width: 640px) 50vw, 180px"
        style={{
          objectFit: "cover",
          objectPosition: "center top",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(var(--ink-rgb),0.35) 0%, transparent 42%)",
          pointerEvents: "none",
        }}
      />
      {label ? (
        <span
          className="mono"
          style={{
            position: "absolute",
            bottom: 9,
            left: 10,
            fontSize: 8.5,
            letterSpacing: "0.16em",
            color: "var(--ondark)",
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
          }}
        >
          {label}
        </span>
      ) : null}
      {num ? (
        <span
          className="mono"
          style={{
            position: "absolute",
            top: 10,
            right: 11,
            fontSize: 9,
            letterSpacing: "0.16em",
            color: "var(--accent)",
            textShadow: "0 1px 2px rgba(0,0,0,0.35)",
          }}
        >
          {num}
        </span>
      ) : null}
    </div>
  );
}

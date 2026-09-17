"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <main>
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(40px, 7vw, 100px) clamp(18px, 4.5vw, 64px) clamp(28px, 4vw, 48px)",
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
            CONTACT
          </span>
        </div>
        <h1
          style={{
            fontSize: "clamp(38px, 6.6vw, 104px)",
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            margin: 0,
            maxWidth: "18ch",
          }}
        >
          Book a discovery call
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            margin: "clamp(20px, 3vw, 32px) 0 0",
            fontSize: "clamp(15.5px, 1.25vw, 19px)",
            lineHeight: 1.6,
            color: "var(--muted)",
            maxWidth: "48ch",
          }}
        >
          Thirty minutes. No pitch deck. Tell us what you&apos;re building and
          we&apos;ll figure out the next step together.
        </p>
      </section>

      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 clamp(18px, 4.5vw, 64px) clamp(40px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(var(--ink-rgb),0.14)",
            background: "var(--panel)",
            overflow: "hidden",
            minHeight: "clamp(640px, 80vh, 900px)",
            height: "clamp(640px, 80vh, 900px)",
          }}
        >
          <Cal
            namespace="30min"
            calLink="salissalman/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
            }}
          />
        </div>
      </section>
    </main>
  );
}

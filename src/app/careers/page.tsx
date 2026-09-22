import Link from "next/link";

type Role = {
  id: string;
  num: string;
  title: string;
  category: string;
  type: string;
  hook: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
};

const roles: Role[] = [
  {
    id: "full-stack-engineer",
    num: "01",
    title: "Full Stack Engineer",
    category: "ENGINEERING",
    type: "FULL TIME",
    hook:
      "We don't hire generalists who dabble. We hire engineers who own their work end to end and care deeply about what they ship.",
    about:
      "As a Full Stack Engineer at Fragment, you will own complete feature development across the stack: from data models and APIs to polished front end interfaces. You will work directly alongside the founding team and clients on products that real users depend on every day. There is no hand-holding here. You will make architectural decisions, write production code, and be accountable for the results. Every layer of the stack is yours to understand and improve.",
    responsibilities: [
      "Architect and implement web applications from the ground up using Next.js, React, and Node.js, making decisions about structure that will hold up as systems grow.",
      "Design relational data models with PostgreSQL, write efficient queries, and handle schema migrations as requirements evolve.",
      "Build and document RESTful and event-driven APIs that are fast, secure, and readable by the next engineer who inherits them.",
      "Set up CI/CD pipelines, write meaningful tests, and configure deployment infrastructure on AWS or GCP so releases are boring in the best way.",
      "Review code with a clear point of view, raise the bar for the team, and communicate trade-offs plainly rather than with jargon.",
      "Collaborate directly with clients to understand their problems and translate them into clean, working implementations on time.",
    ],
    requirements: [
      "Strong command of TypeScript across the full stack, both on the server with Node.js and in the browser with React or Next.js.",
      "Solid, hands on experience with PostgreSQL including schema design, indexing, and writing queries that do not degrade under load.",
      "Familiarity with Docker, CI/CD workflows, and deploying to cloud infrastructure with some degree of ownership over the process.",
      "A clear instinct for what good architecture looks like and the ability to explain that instinct to teammates without being condescending.",
      "A portfolio of shipped work you can speak to in depth, including decisions you made and things you would do differently now.",
      "Comfort working in a small, fast-moving team where you will not always have a spec and are expected to fill in the gaps intelligently.",
    ],
  },
  {
    id: "business-developer",
    num: "02",
    title: "Business Developer",
    category: "BUSINESS",
    type: "FULL TIME",
    hook:
      "Fragment is growing and we need someone who can open doors, build real relationships, and help us land clients who are the right fit.",
    about:
      "This is not a metrics-driven enterprise sales role with a quota board and a script. You will be having conversations with founders, CTOs, and product leads about real technical problems and helping them understand how Fragment can solve them. You will manage the full sales cycle from first contact through to signed agreements, work with the founding team to sharpen our positioning, and develop the assets that win business. You will know the work well enough to represent it credibly and care enough to represent it accurately.",
    responsibilities: [
      "Build and manage an outbound outreach strategy across LinkedIn, email, and warm referral networks, prioritising quality of contact over volume.",
      "Qualify inbound leads from our website and community presence, run discovery calls, and determine whether there is a genuine fit before involving the technical team.",
      "Write and refine proposals, scope documents, and case study assets in close collaboration with the founders, making sure they reflect the work honestly.",
      "Develop and maintain long term relationships with potential clients, past clients, and referral partners, treating relationship capital as a real asset.",
      "Identify new verticals and use cases where Fragment's capabilities are a strong fit and bring those opportunities to the team with enough context to act on.",
      "Track pipeline activity and provide clear visibility to the founding team on deal stage, velocity, and forecast without needing to be chased for updates.",
    ],
    requirements: [
      "Prior experience in business development, account management, or a client-facing role at a software company, agency, or consultancy.",
      "Excellent written and verbal communication skills, including the ability to write a compelling proposal that does not read like a template.",
      "Genuine curiosity about how software gets built and the ability to hold a credible conversation with a technical decision-maker without bluffing.",
      "A disciplined approach to follow-through and pipeline hygiene, because long term relationships are built on reliability more than charm.",
      "Comfort in a small, autonomous environment where you own your results and are expected to operate without a playbook for every situation.",
    ],
  },
  {
    id: "intern",
    num: "03",
    title: "Engineering Intern",
    category: "ENGINEERING",
    type: "INTERNSHIP",
    hook:
      "A real internship at a studio that moves fast. You will write code that ships to production, not builds that sit in a staging environment.",
    about:
      "We are looking for a motivated and curious intern to join the team for three to six months. Depending on your background and strengths, you will contribute to product engineering, AI systems, or internal tooling under the guidance of senior engineers. You will participate in code reviews, show up to architecture discussions, and be treated as a junior engineer with real responsibilities and real room to grow. The goal is that by the time you leave, you have shipped work you can speak to in an interview and a clearer sense of what kind of engineer you want to become.",
    responsibilities: [
      "Contribute to features and bug fixes on live client projects alongside senior engineers, with clear guidance on scope and expected outcomes.",
      "Write, test, and review code in TypeScript or Python depending on the project, holding yourself to the team's standards from day one.",
      "Learn how production systems are designed, deployed, and monitored through direct participation rather than observation.",
      "Ask questions in planning and architecture discussions, develop your intuition about system design, and document what you learn clearly.",
      "Take ownership of at least one self-contained piece of work per month that you can present to the team and explain from first principles.",
    ],
    requirements: [
      "Currently enrolled in a Computer Science, Software Engineering, or related programme, or recently graduated within the last twelve months.",
      "Working familiarity with at least one modern programming language and some practical exposure to building web applications.",
      "Genuine interest in how software systems are built at a production level, not just how individual functions work in isolation.",
      "A willingness to be wrong in front of the team, ask clarifying questions without embarrassment, and learn quickly from feedback.",
      "Ability to commit to a minimum of three months and show up consistently, treating this like a job rather than a class project.",
    ],
  },
  {
    id: "videographer",
    num: "04",
    title: "Videographer",
    category: "CREATIVE",
    type: "CONTRACT",
    hook:
      "Fragment is building a visual identity that matches the quality of the products we ship. We need someone who thinks in stories, not just shots.",
    about:
      "You will handle everything from concept to final cut. That means planning shoots, directing sessions with the team or with clients, capturing footage, and delivering polished edits that feel intentional and consistent with the Fragment brand. You will also play a meaningful role in shaping what Fragment looks and sounds like in motion, working closely with the brand and marketing lead to develop a visual voice across channels. This is a contract position with scope to evolve into a longer arrangement as the studio's content needs grow.",
    responsibilities: [
      "Plan, shoot, and edit short form video content for LinkedIn, Instagram, and other channels where Fragment has or intends to build a presence.",
      "Produce case study videos and client testimonial recordings that showcase the studio's work with the credibility and clarity those projects deserve.",
      "Capture team content including behind the scenes footage, event coverage, and culture pieces that show who Fragment is beyond the work.",
      "Own the post production workflow from rough cut to final export, including colour grading, sound design, and any motion graphics needed for context.",
      "Work with the brand and marketing lead to ensure all visual output is consistent in tone, style, and quality before anything is published.",
      "Maintain and organise the studio's visual asset library so footage and exports are findable and usable by the broader team.",
    ],
    requirements: [
      "A strong portfolio of edited video work, professional or personal, that demonstrates both technical competence and a recognisable point of view.",
      "Proficiency in Adobe Premiere Pro or Final Cut Pro, and comfort with After Effects or DaVinci Resolve for colour grading and motion work.",
      "A reliable eye for composition, lighting, and visual storytelling that is evident in your work without needing to be explained.",
      "Experience shooting in varied conditions including natural light, indoor environments, and uncontrolled documentary situations.",
      "The ability to receive a brief and return with a concept, not just footage, and to communicate that concept clearly before production begins.",
    ],
  },
];

export default function CareersPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(48px, 7vw, 96px) clamp(18px, 4.5vw, 64px) clamp(40px, 5vw, 72px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "clamp(24px, 3.4vw, 44px)",
          }}
        >
          <span
            style={{
              width: 32,
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
              textTransform: "uppercase",
            }}
          >
            Fragment Studio · Careers
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px, 4vw, 64px)",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <h1
              style={{
                fontSize: "clamp(44px, 7.2vw, 104px)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                margin: "0 0 clamp(22px, 3vw, 36px)",
              }}
            >
              Join the
              <br />
              studio
              <span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: "52ch",
                margin: 0,
              }}
            >
              We are a small team that ships serious products. Every person at
              Fragment owns their work, shows up fully, and makes the studio
              better by being here. We are looking for people who care about
              craft and want to build things that matter.
            </p>
          </div>

          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              ["TEAM SIZE", "6 engineers"],
              ["LOCATION", "Remote first"],
              ["OPEN ROLES", `${roles.length} positions`],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
                  paddingTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 180,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.2em",
                    color: "var(--faint)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role listings ── */}
      <section
        style={{
          borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            margin: "0 auto",
            padding:
              "0 clamp(18px, 4.5vw, 64px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "clamp(24px, 3.2vw, 42px) 0",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 54px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Open roles
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                color: "var(--faint)",
              }}
            >
              {String(roles.length).padStart(2, "0")} POSITIONS
            </span>
          </div>
        </div>

        {roles.map((role, ri) => (
          <article
            key={role.id}
            id={role.id}
            style={{
              borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
              background: ri % 2 === 1 ? "var(--panel)" : "var(--bg)",
            }}
          >
            <div
              style={{
                maxWidth: 1480,
                margin: "0 auto",
                padding:
                  "clamp(32px, 4.6vw, 64px) clamp(18px, 4.5vw, 64px)",
              }}
            >
              {/* Role header */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(14px, 2vw, 28px)",
                  alignItems: "flex-start",
                  marginBottom: "clamp(28px, 3.6vw, 48px)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.18em",
                    color: "var(--accent)",
                    paddingTop: 6,
                    flex: "0 0 auto",
                  }}
                >
                  {role.num}
                </span>
                <h3
                  style={{
                    flex: "1 1 280px",
                    fontSize: "clamp(26px, 3.8vw, 52px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {role.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    paddingTop: 4,
                    flex: "0 0 auto",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      border: "1px solid var(--accent)",
                      color: "var(--accent)",
                      padding: "6px 12px",
                    }}
                  >
                    {role.category}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      border: "1px solid rgba(var(--ink-rgb),0.2)",
                      color: "var(--mono)",
                      padding: "6px 12px",
                    }}
                  >
                    {role.type}
                  </span>
                </div>
              </div>

              {/* Hook line */}
              <p
                style={{
                  fontSize: "clamp(16px, 1.5vw, 21px)",
                  lineHeight: 1.52,
                  color: "var(--ink)",
                  fontWeight: 400,
                  maxWidth: "64ch",
                  margin: "0 0 clamp(22px, 3vw, 36px)",
                  letterSpacing: "-0.01em",
                }}
              >
                {role.hook}
              </p>

              {/* About + columns */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(24px, 4vw, 64px)",
                  marginBottom: "clamp(28px, 3.6vw, 48px)",
                }}
              >
                {/* About the role */}
                <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "0.22em",
                      color: "var(--faint)",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    ABOUT THE ROLE
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(14.5px, 1.1vw, 16.5px)",
                      lineHeight: 1.72,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {role.about}
                  </p>
                </div>

                {/* What you'll do */}
                <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: "0.22em",
                      color: "var(--faint)",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    WHAT YOU WILL DO
                  </span>
                  <ol
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                    }}
                  >
                    {role.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: 16,
                          alignItems: "baseline",
                          padding: "13px 0",
                          borderBottom:
                            i < role.responsibilities.length - 1
                              ? "1px solid rgba(var(--ink-rgb),0.08)"
                              : undefined,
                        }}
                      >
                        <span
                          className="mono"
                          style={{
                            fontSize: 9.5,
                            letterSpacing: "0.14em",
                            color: "var(--accent)",
                            flex: "0 0 22px",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          style={{
                            fontSize: "clamp(13.5px, 1.05vw, 15.5px)",
                            lineHeight: 1.65,
                            color: "var(--muted)",
                          }}
                        >
                          {r}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Requirements */}
              <div
                style={{
                  background:
                    ri % 2 === 1 ? "var(--bg)" : "var(--panel)",
                  padding: "clamp(20px, 2.6vw, 36px)",
                  marginBottom: "clamp(24px, 3.2vw, 44px)",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: "var(--faint)",
                    display: "block",
                    marginBottom: 18,
                  }}
                >
                  WHAT WE ARE LOOKING FOR
                </span>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "clamp(10px, 1.4vw, 16px)",
                  }}
                >
                  {role.requirements.map((req, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: "var(--accent)",
                          display: "block",
                          flex: "0 0 auto",
                          marginTop: 7,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "clamp(13.5px, 1.05vw, 15.5px)",
                          lineHeight: 1.65,
                          color: "var(--muted)",
                        }}
                      >
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                {/* Replace href="#" with the Google Drive form URL when ready */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono btn-fill"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "16px 28px",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Apply for this role →
                </a>
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--faint)",
                  }}
                >
                  {role.category} · {role.type}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          borderTop: "1px solid rgba(var(--ink-rgb),0.12)",
          maxWidth: 1480,
          margin: "0 auto",
          padding:
            "clamp(40px, 6vw, 80px) clamp(18px, 4.5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(20px, 3vw, 40px)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 44px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              margin: "0 0 10px",
            }}
          >
            Not a fit right now
            <span style={{ color: "var(--accent)" }}>?</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(14.5px, 1.1vw, 17px)",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "46ch",
            }}
          >
            Send us your work anyway. If you build things well and care about
            quality, we want to know you exist.
          </p>
        </div>
        <Link
          href="/contact"
          className="mono btn-fill"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "16px 28px",
            textDecoration: "none",
            flex: "0 0 auto",
          }}
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}

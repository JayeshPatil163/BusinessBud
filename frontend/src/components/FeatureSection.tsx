const STEPS = [
  {
    number: "01",
    title: "Describe your idea",
    body: "Tell us about your concept — the problem, the audience, and what makes it different. Takes two minutes.",
  },
  {
    number: "02",
    title: "AI does the heavy lifting",
    body: "Our model cross-references market data, competitor landscapes, and execution patterns to build a full picture.",
  },
  {
    number: "03",
    title: "Get your full playbook",
    body: "Receive a structured analysis: SWOT, market sizing, roadmap, financial projections, and investor pitch outline.",
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.09 7.26L18 8.18L14 12.08L15.18 18L10 15.27L4.82 18L6 12.08L2 8.18L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Market Intelligence",
    body: "Real-time market sizing, trend signals, and opportunity maps built from live data sources.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M4.93 4.93l2.12 2.12M12.95 12.95l2.12 2.12M4.93 15.07l2.12-2.12M12.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Competitor Mapping",
    body: "Know who's in the space, what they do well, and where the gaps are that you can own.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M3 17V13M7 17V9M11 17V11M15 17V7M19 17V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Financial Projections",
    body: "Revenue models, breakeven timelines, and funding benchmarks relevant to your stage and industry.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M9 12H3l7-10v8h6L9 20V12Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Execution Roadmap",
    body: "Phased action plans with milestones, dependencies, and what to prioritise in the first 90 days.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M17 3L10 17 7 10 0.5 7 17 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Investor Pitch Outline",
    body: "A structured narrative ready to adapt into a slide deck — problem, solution, traction, ask.",
  },
  {
    icon: (
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 7v5M10 14v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Risk Assessment",
    body: "Honest risk analysis — regulatory, market timing, competitive — so you go in eyes open.",
  },
];

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY    = "'Inter', -apple-system, sans-serif";

const FeatureSection = () => {
  return (
    <>
      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        style={{ background: "var(--cream-2, #efede8)", scrollMarginTop: "80px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="chip mb-5 inline-flex">How it works</span>
            {/* Playfair 700 for the heading — italic on one word only */}
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.1,
              }}
            >
              Three steps from{" "}
              <em style={{ fontStyle: "italic", fontWeight: 800, color: "var(--ink-2)" }}>
                spark
              </em>{" "}
              to strategy.
            </h2>
            <p style={{ fontFamily: BODY, fontSize: "14px", fontWeight: 400, color: "var(--text-3)", marginTop: "10px" }}>
              No fluff. No 40-page templates. Just clarity.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="glass-card group"
                style={{
                  padding: "28px 32px",
                  borderRadius: "24px",
                  display: "flex",
                  gap: "28px",
                  alignItems: "flex-start",
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {/* Ghost step number */}
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "2.8rem",
                    color: "rgba(0,0,0,0.07)",
                    lineHeight: 1,
                    flexShrink: 0,
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                  }}
                >
                  {step.number}
                </span>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: BODY,
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "var(--text-2)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-24 px-6"
        style={{ background: "var(--cream)", scrollMarginTop: "80px" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="chip mb-5 inline-flex">Features</span>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: "clamp(1.9rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.1,
              }}
            >
              Everything a founder needs,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 800, color: "var(--text-2)" }}>
                nothing they don't.
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="glass-card-flat group"
                style={{ padding: "24px 26px" }}
              >
                <div
                  className="mb-4 w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-2)" }}
                >
                  {feat.icon}
                </div>
                {/* Feature titles: Inter 600, not Playfair — these are UI-level, not display-level */}
                <h3
                  style={{
                    fontFamily: BODY,
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "var(--ink)",
                    marginBottom: "8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: BODY,
                    fontWeight: 400,
                    fontSize: "13.5px",
                    color: "var(--text-2)",
                    lineHeight: 1.65,
                  }}
                >
                  {feat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;

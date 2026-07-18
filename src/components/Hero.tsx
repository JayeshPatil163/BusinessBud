import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY    = "'Inter', -apple-system, sans-serif";

const Hero = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--cream)", paddingTop: "120px", paddingBottom: "80px" }}
    >
      {/* ── Large ghost background word — editorial texture ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontStyle: "italic",
            fontSize: "clamp(130px, 24vw, 340px)",
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0,0,0,0.045)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          ideas
        </span>
      </div>

      {/* Radial fade so text stays legible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 52%, rgba(246,245,241,0.96) 28%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Eyebrow */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <span className="chip" style={{ fontSize: "10.5px", letterSpacing: "0.1em" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--ink)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            AI-Powered Venture Studio
          </span>
        </div>

        {/* ── Main headline ──
            Rule: Playfair Display for the display headline ONLY.
            The italic accent word "idea" uses Playfair Bold Italic — thick, rich, not thin.
            Every other word is Playfair 700 normal.
        */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: 0,
          }}
        >
          From rough{" "}
          {/* The ONE italic accent word — Playfair Bold Italic, thick & clear */}
          <em
            style={{
              fontFamily: DISPLAY,
              fontStyle: "italic",
              fontWeight: 800,
              color: "var(--ink-2)",
              letterSpacing: "-0.01em",
            }}
          >
            idea
          </em>
          <br />
          to real venture.
        </h1>

        {/* Subtext — Inter only */}
        <p
          className="animate-fade-up delay-200"
          style={{
            fontFamily: BODY,
            fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
            fontWeight: 400,
            color: "var(--text-2)",
            lineHeight: 1.75,
            margin: "1.8rem auto 2.5rem",
            maxWidth: "430px",
          }}
        >
          BusinessBud evaluates your idea with AI — market fit, competitors,
          execution roadmap, financial projections — in minutes, not months.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-300">
          <button
            onClick={() => navigate("/start")}
            className="btn-dark"
            style={{ padding: "14px 30px", fontSize: "13.5px" }}
          >
            Evaluate my idea
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="btn-outline"
            style={{ padding: "14px 30px", fontSize: "13.5px" }}
          >
            See how it works
          </button>
        </div>

        {/* Stats — Playfair for numbers, Inter for labels */}
        <div className="flex items-center justify-center gap-10 mt-14 animate-fade-up delay-400">
          {[
            { value: "2,400+", label: "Ideas evaluated" },
            { value: "94%",    label: "Founder satisfaction" },
            { value: "< 3 min",label: "To full analysis" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  color: "var(--ink)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "var(--text-3)",
                  marginTop: "4px",
                  letterSpacing: "0.03em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up delay-500 flex flex-col items-center gap-2"
        style={{ opacity: 0.32 }}
      >
        <span
          style={{
            fontFamily: BODY,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-3)",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--text-3), transparent)" }}
        />
      </div>
    </section>
  );
};

export default Hero;

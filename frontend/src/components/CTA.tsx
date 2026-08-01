import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY    = "'Inter', -apple-system, sans-serif";

const CTA = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleEvaluate = () => {
    if (isAuthenticated) {
      navigate("/start");
    } else {
      setAuthOpen(true);
    }
  };

  useEffect(() => {
    if (authOpen && isAuthenticated) {
      setAuthOpen(false);
      navigate("/start");
    }
  }, [authOpen, isAuthenticated, navigate]);

  return (
    <section className="py-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto">
        <div
          style={{
            background: "var(--ink)",
            borderRadius: "40px",
            padding: "clamp(48px, 8vw, 80px) clamp(32px, 6vw, 72px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ghost background word in Playfair Italic */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-end pr-10 overflow-hidden select-none"
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontStyle: "italic",
                fontSize: "clamp(90px, 17vw, 220px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                userSelect: "none",
              }}
            >
              venture
            </span>
          </div>

          <div className="relative z-10 max-w-xl">
            <span
              style={{
                display: "inline-block",
                fontFamily: BODY,
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "28px",
              }}
            >
              Ready when you are
            </span>

            {/* Playfair 700 headline with bold italic accent */}
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: "1.25rem",
              }}
            >
              Your idea deserves
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                a real shot.
              </em>
            </h2>

            <p
              style={{
                fontFamily: BODY,
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                maxWidth: "380px",
              }}
            >
              Join thousands of founders who turned a rough concept into a
              structured, fundable venture.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEvaluate}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 30px",
                  background: "rgba(255,255,255,0.95)",
                  color: "var(--ink)",
                  fontFamily: BODY,
                  fontSize: "13.5px",
                  fontWeight: 500,
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.95)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                Evaluate my idea
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 30px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: BODY,
                  fontSize: "13.5px",
                  fontWeight: 400,
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                }}
              >
                View pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="signup"
      />
    </section>
  );
};

export default CTA;

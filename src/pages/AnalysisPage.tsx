import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { Check, X, ArrowRight, Users, TrendingUp, Clock, BarChart3, BadgeCheck, Target } from "lucide-react";
import { type AnalysisResponse } from "@/services/grokService";

/* ── Reusable card ── */
const AnalysisCard = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    className="glass-card"
    style={{ ...style }}
  >
    {children}
  </div>
);

const SectionTitle = ({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "14px",
        background: "rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={16} style={{ color: "var(--ink-2)" }} />
    </div>
    <div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "2px" }}>
        {label}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--ink)", letterSpacing: "-0.02em", fontOpticalSizing: "auto" }}>
        {title}
      </h2>
    </div>
  </div>
);

/* ── Main ── */
const AnalysisPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading]         = useState(true);
  const [businessIdea, setIdea]       = useState<any>(null);
  const [analysis, setAnalysis]       = useState<AnalysisResponse | null>(null);
  const [openPhase, setOpenPhase]     = useState(0);

  useEffect(() => {
    try {
      const ideaRaw     = sessionStorage.getItem("businessIdea");
      const analysisRaw = sessionStorage.getItem("businessAnalysis");
      if (!ideaRaw) {
        toast({ variant: "destructive", title: "No idea found", description: "Submit one first." });
        navigate("/start");
        return;
      }
      setIdea(JSON.parse(ideaRaw));
      if (analysisRaw) setAnalysis(JSON.parse(analysisRaw));
      setLoading(false);
    } catch {
      toast({ variant: "destructive", title: "Error loading data" });
      navigate("/start");
    }
  }, [navigate]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "2px solid rgba(0,0,0,0.08)",
              borderTopColor: "var(--ink)",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)" }}>
            Loading analysis…
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  if (!businessIdea || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-2)", marginBottom: "16px" }}>No analysis data found.</p>
          <button onClick={() => navigate("/start")} className="btn-dark">Submit an idea</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <Navbar />

      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* ── Page header ── */}
          <div className="text-center mb-12 animate-fade-up">
            <span className="chip mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ink)", display: "inline-block" }} />
              Analysis Complete
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                letterSpacing: "-0.04em",
                color: "var(--ink)",
                lineHeight: 1.0,
                marginBottom: "0.5rem",
                
              }}
            >
              {businessIdea.title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-3)" }}>
              {businessIdea.industry} · AI-powered analysis
            </p>
          </div>

          {/* ── Sections ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* SWOT */}
            <AnalysisCard>
              <div style={{ padding: "28px" }}>
                <SectionTitle icon={BadgeCheck} label="SWOT" title="Strengths & Weaknesses" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {/* Strengths */}
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "18px",
                      background: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Check size={11} /> Strengths
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {analysis.strengthsWeaknesses.strengths.map((s, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                            <Check size={9} style={{ color: "var(--ink)" }} />
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.55 }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "18px",
                      background: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <X size={11} /> Weaknesses
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {analysis.strengthsWeaknesses.weaknesses.map((w, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
                            <X size={9} style={{ color: "var(--text-2)" }} />
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.55 }}>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnalysisCard>

            {/* Market */}
            <AnalysisCard>
              <div style={{ padding: "28px" }}>
                <SectionTitle icon={TrendingUp} label="Market" title="Market Analysis" />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.75, marginBottom: "20px" }}>
                  {analysis.marketAnalysis}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "12px" }}>
                  Competitors
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {analysis.competitorAnalysis.map((c, i) => (
                    <span key={i} style={{ padding: "6px 14px", borderRadius: "100px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </AnalysisCard>

            {/* Target customer */}
            <AnalysisCard>
              <div style={{ padding: "28px" }}>
                <SectionTitle icon={Users} label="Audience" title="Target Customer" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "8px" }}>Demographics</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.65 }}>{analysis.targetCustomer.demographics}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "8px", marginTop: "18px" }}>Psychographics</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.65 }}>{analysis.targetCustomer.psychographics}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "12px" }}>Pain Points</p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {analysis.targetCustomer.painPoints.map((pt, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <Target size={12} style={{ flexShrink: 0, color: "var(--text-3)", marginTop: "3px" }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)", lineHeight: 1.55 }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnalysisCard>

            {/* Roadmap */}
            <AnalysisCard>
              <div style={{ padding: "28px" }}>
                <SectionTitle icon={Clock} label="Roadmap" title="Implementation Roadmap" />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {analysis.roadmap.map((phase, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOpenPhase(idx === openPhase ? -1 : idx)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "18px 20px",
                        borderRadius: "18px",
                        background: idx === openPhase ? "var(--ink)" : "rgba(0,0,0,0.02)",
                        border: `1px solid ${idx === openPhase ? "transparent" : "rgba(0,0,0,0.06)"}`,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: idx === openPhase ? "14px" : "0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "8px",
                              background: idx === openPhase ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontWeight: 800,
                              fontSize: "14px",
                              color: idx === openPhase ? "rgba(255,255,255,0.85)" : "var(--text-3)",
                              
                              flexShrink: 0,
                            }}
                          >
                            {idx + 1}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: idx === openPhase ? "#fff" : "var(--text-1)" }}>
                            {phase.phase}
                          </span>
                        </div>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 300, color: idx === openPhase ? "rgba(255,255,255,0.45)" : "var(--text-3)", letterSpacing: "0.03em" }}>
                          {phase.timeframe}
                        </span>
                      </div>
                      {idx === openPhase && (
                        <ul style={{ paddingLeft: "38px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {phase.tasks.map((task, ti) => (
                            <li key={ti} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: "6px" }} />
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{task}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </AnalysisCard>

            {/* Financials */}
            <AnalysisCard>
              <div style={{ padding: "28px" }}>
                <SectionTitle icon={BarChart3} label="Financials" title="Financial Projections" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  {[
                    { label: "Initial Investment", value: analysis.financialProjections.initialInvestment },
                    { label: "Breakeven Point",    value: analysis.financialProjections.breakevenPoint },
                  ].map((stat) => (
                    <div key={stat.label} style={{ padding: "20px", borderRadius: "18px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "8px" }}>{stat.label}</p>
                      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "2rem", color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1, fontOpticalSizing: "auto" }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "12px" }}>
                  Revenue Streams
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {analysis.financialProjections.revenueStreams.map((stream, i) => (
                    <span key={i} style={{ padding: "7px 16px", borderRadius: "100px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 300, color: "var(--text-2)" }}>
                      {stream}
                    </span>
                  ))}
                </div>
              </div>
            </AnalysisCard>

            {/* CTA */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
              <button onClick={() => navigate("/results")} className="btn-dark" style={{ padding: "14px 32px" }}>
                Continue to Detailed Roadmap
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalysisPage;

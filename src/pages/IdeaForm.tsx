import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Lightbulb, Target, Users, Zap, BarChart3 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { generateBusinessAnalysis } from "@/services/grokService";
import * as z from "zod";

const formSchema = z.object({
  title:         z.string().min(2, "At least 2 characters."),
  description:   z.string().min(10, "At least 10 characters."),
  industry:      z.string().min(3, "At least 3 characters."),
  targetAudience:z.string().min(10, "At least 10 characters."),
  uniqueSelling: z.string().min(10, "At least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { id: "title",          label: "Idea Name",      icon: Lightbulb,  placeholder: "e.g. AI-Powered Tutoring Platform" },
  { id: "description",    label: "Description",     icon: Zap,        placeholder: "Describe your idea — the problem you solve and how.", textarea: true },
  { id: "industry",       label: "Industry",        icon: BarChart3,  placeholder: "e.g. Education, Healthcare, FinTech" },
  { id: "targetAudience", label: "Target Audience", icon: Users,      placeholder: "Who is your ideal customer? Describe them vividly.", textarea: true },
  { id: "uniqueSelling",  label: "Your Edge",       icon: Target,     placeholder: "What makes this genuinely different from everything else?", textarea: true },
];

const IdeaForm = () => {
  const [values, setValues]         = useState<Partial<FormValues>>({});
  const [errors, setErrors]         = useState<Partial<Record<keyof FormValues, string>>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateValue = (key: keyof FormValues, val: string) => {
    setValues((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    try {
      formSchema.parse(values);
      return true;
    } catch (err: any) {
      const e: Partial<Record<keyof FormValues, string>> = {};
      err.errors?.forEach((x: any) => { if (x.path[0]) e[x.path[0] as keyof FormValues] = x.message; });
      setErrors(e);
      const firstErr = STEPS.findIndex((s) => e[s.id as keyof FormValues]);
      if (firstErr !== -1) setActiveStep(firstErr);
      return false;
    }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const idea = {
        title:         values.title!,
        description:   values.description!,
        industry:      values.industry!,
        targetAudience:values.targetAudience!,
        uniqueSelling: values.uniqueSelling!,
      };
      toast({ title: "Analyzing your idea…", description: "This takes about a minute." });
      const analysis = await generateBusinessAnalysis(idea);
      sessionStorage.setItem("businessIdea",     JSON.stringify(idea));
      sessionStorage.setItem("businessAnalysis", JSON.stringify(analysis));
      toast({ title: "Analysis complete!", description: "Redirecting…" });
      navigate("/analysis");
    } catch {
      setIsSubmitting(false);
      toast({ variant: "destructive", title: "Analysis failed", description: "Please try again." });
    }
  };

  const filledCount = STEPS.filter((s) => values[s.id as keyof FormValues]).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <Navbar />

      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <span className="chip mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ink)", display: "inline-block" }} />
              Step 1 of 2
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.0,
                marginBottom: "1rem",
              }}
            >
              Tell us about{" "}
              <em style={{ fontStyle: "italic", fontWeight: 800, color: "var(--ink-2)" }}>
                your idea.
              </em>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--text-2)",
                lineHeight: 1.65,
              }}
            >
              The more you share, the sharper the analysis.
            </p>
          </div>

          {/* Step cards */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {STEPS.map((step, idx) => {
              const Icon      = step.icon;
              const key       = step.id as keyof FormValues;
              const isFocused = activeStep === idx;
              const hasValue  = !!values[key];
              const hasError  = !!errors[key];

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: hasError
                      ? "1px solid rgba(220,60,60,0.3)"
                      : isFocused
                      ? "1px solid rgba(0,0,0,0.18)"
                      : "1px solid rgba(255,255,255,0.92)",
                    borderRadius: "24px",
                    boxShadow: isFocused
                      ? "0 8px 32px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)"
                      : "0 1px 3px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    overflow: "hidden",
                  }}
                >
                  {/* Card header row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: isFocused ? "22px 24px 16px" : "18px 24px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "12px",
                        background: isFocused ? "var(--ink)" : "rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "background 0.25s",
                      }}
                    >
                      <Icon
                        size={15}
                        style={{
                          color: isFocused ? "#fff" : "rgba(0,0,0,0.35)",
                          transition: "color 0.25s",
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "10.5px",
                          fontWeight: 500,
                          letterSpacing: "0.09em",
                          textTransform: "uppercase",
                          color: isFocused ? "var(--text-1)" : "var(--text-3)",
                          transition: "color 0.25s",
                          marginBottom: hasValue && !isFocused ? "3px" : "0",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")} — {step.label}
                      </p>
                      {/* Collapsed preview */}
                      {hasValue && !isFocused && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            fontWeight: 400,
                            color: "var(--text-2)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {values[key]}
                        </p>
                      )}
                    </div>

                    {/* Completion dot */}
                    {hasValue && !isFocused && (
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "var(--ink)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>

                  {/* Expanded input */}
                  {isFocused && (
                    <div style={{ padding: "0 24px 22px" }}>
                      {step.textarea ? (
                        <textarea
                          autoFocus
                          value={values[key] || ""}
                          onChange={(e) => updateValue(key, e.target.value)}
                          placeholder={step.placeholder}
                          rows={4}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "var(--text-1)",
                            lineHeight: 1.65,
                            resize: "vertical",
                            minHeight: "90px",
                          }}
                          // @ts-ignore
                          placeholder-style={{ color: "var(--text-3)" }}
                        />
                      ) : (
                        <input
                          autoFocus
                          type="text"
                          value={values[key] || ""}
                          onChange={(e) => updateValue(key, e.target.value)}
                          placeholder={step.placeholder}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "var(--text-1)",
                          }}
                        />
                      )}
                      {hasError && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "12px",
                            color: "rgba(200,50,50,0.85)",
                            marginTop: "8px",
                            fontWeight: 400,
                          }}
                        >
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Progress */}
            <div style={{ paddingTop: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 300, color: "var(--text-3)" }}>
                  {filledCount} / {STEPS.length} fields
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 300, color: "var(--text-3)" }}>
                  {Math.round((filledCount / STEPS.length) * 100)}%
                </span>
              </div>
              <div
                style={{
                  height: "2px",
                  borderRadius: "100px",
                  background: "rgba(0,0,0,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "100px",
                    background: "var(--ink)",
                    width: `${(filledCount / STEPS.length) * 100}%`,
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: "4px",
                width: "100%",
                padding: "15px",
                borderRadius: "20px",
                background: "var(--ink)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.18)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Analyzing…
                </>
              ) : (
                <>
                  Analyze My Idea
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IdeaForm;

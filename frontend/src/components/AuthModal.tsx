import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

const AuthModal = ({ isOpen, onClose, initialMode = "signup" }: AuthModalProps) => {
  const [mode, setMode]           = useState<"signin" | "signup">(initialMode);
  const [showPassword, setShow]   = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        await register(email, name || email.split("@")[0], password);
        toast({
          title: "Account created!",
          description: "Welcome to BusinessBud.",
        });
      } else {
        await login(email, password);
        toast({
          title: "Welcome back!",
          description: "Signed in successfully.",
        });
      }
      onClose();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: err instanceof Error ? err.message : "Please check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = "/api/auth/google";
  };


  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,9,8,0.5)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal */}
      <div
        className="animate-scale-in w-full"
        style={{
          maxWidth: "420px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.95)",
          borderRadius: "32px",
          padding: "36px 32px 32px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-2)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.09)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.05)")}
        >
          <X size={14} />
        </button>

        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <div
            style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.5L6 10.5L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            BusinessBud
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "1.8rem",
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            marginBottom: "6px",
            lineHeight: 1.1,
          }}
        >
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            color: "var(--text-2)",
            marginBottom: "24px",
          }}
        >
          {mode === "signup"
            ? "Start evaluating your ideas for free."
            : "Sign in to continue building."}
        </p>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            background: "rgba(0,0,0,0.05)",
            borderRadius: "16px",
            padding: "4px",
            marginBottom: "20px",
          }}
        >
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "12px",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "var(--ink)" : "var(--text-3)",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "12px",
            borderRadius: "16px",
            background: "rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.09)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13.5px",
            fontWeight: 400,
            color: "var(--text-1)",
            cursor: "pointer",
            transition: "background 0.2s",
            marginBottom: "16px",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.03)")}
        >
          {/* Google G */}
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* OR */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.07)" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--text-3)", letterSpacing: "0.06em" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.07)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              style={{ paddingRight: "48px" }}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-3)",
                display: "flex",
                padding: "0",
              }}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "4px",
              width: "100%",
              padding: "13px",
              borderRadius: "16px",
              background: isSubmitting ? "var(--text-3)" : "var(--ink)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              border: "none",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--ink-2)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--ink)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }
            }}
          >
            {isSubmitting ? "Please wait..." : (mode === "signup" ? "Create Account" : "Sign In")}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        {/* Toggle link */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "var(--text-3)",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-1)",
              fontSize: "12px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {mode === "signup" ? "Sign in" : "Create account"}
          </button>
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "var(--text-3)",
            textAlign: "center",
            marginTop: "12px",
            fontWeight: 300,
          }}
        >
          By continuing you agree to our{" "}
          <a href="#" style={{ color: "var(--text-2)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Terms</a>
          {" "}and{" "}
          <a href="#" style={{ color: "var(--text-2)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

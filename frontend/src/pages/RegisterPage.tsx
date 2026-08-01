import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Lightbulb, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, X } from "lucide-react";
import { getApiUrl } from "@/config/api";

interface PasswordStrength {
  length: boolean;
  uppercase: boolean;
  number: boolean;
}

const getStrengthScore = (s: PasswordStrength) =>
  Object.values(s).filter(Boolean).length;

const RegisterPage = () => {
  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [strength, setStrength] = useState<PasswordStrength>({ length: false, uppercase: false, number: false });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/start", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    setStrength({
      length: form.password.length >= 8,
      uppercase: /[A-Z]/.test(form.password),
      number: /[0-9]/.test(form.password),
    });
  }, [form.password]);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.username) errs.username = "Username is required";
    else if (form.username.length < 3) errs.username = "Must be at least 3 characters";
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) errs.username = "Letters, numbers, and underscores only";
    if (!form.password) errs.password = "Password is required";
    else if (getStrengthScore(strength) < 3) errs.password = "Password does not meet requirements";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await register(form.email, form.username, form.password);
      toast({ title: "Account created!", description: "Welcome to BusinessBud." });
      navigate("/start", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        const anyErr = err as Error & { field?: string; errors?: { field: string; message: string }[] };
        if (anyErr.errors?.length) {
          const fieldErrors: Record<string, string> = {};
          anyErr.errors.forEach((e) => { fieldErrors[e.field] = e.message; });
          setErrors(fieldErrors);
        } else if (anyErr.field) {
          setErrors({ [anyErr.field]: anyErr.message });
        } else {
          setErrors({ general: anyErr.message });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = getApiUrl("/auth/google");
  };

  const strengthScore = getStrengthScore(strength);
  const strengthColors = ["bg-destructive", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen flex gradient-bg">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-venture-accent/20 to-transparent" />
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-venture-accent/20 backdrop-blur-sm border border-venture-accent/30">
            <Lightbulb className="w-10 h-10 text-venture-accent" />
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            Your venture starts<br />
            <span className="text-venture-accent">with one idea</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Join thousands of founders who've turned their ideas into action plans.
          </p>
          <div className="space-y-3 pt-4">
            {[
              { icon: "🎯", text: "Personalized market analysis" },
              { icon: "🚀", text: "Step-by-step execution roadmaps" },
              { icon: "💡", text: "AI-powered competitor insights" },
              { icon: "📊", text: "Financial projection templates" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-left">
                <span className="text-lg">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 text-venture-accent hover:opacity-80 transition-opacity lg:hidden mb-6">
              <Lightbulb className="w-5 h-5" />
              <span className="font-bold">BusinessBud</span>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Create account</h2>
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-venture-accent hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-200 font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {errors.general}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-venture-accent/50 ${
                    errors.email ? "border-destructive" : "border-border focus:border-venture-accent"
                  }`}
                />
              </div>
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="reg-username" className="text-sm font-medium">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="reg-username"
                  type="text"
                  value={form.username}
                  onChange={handleChange("username")}
                  placeholder="your_username"
                  autoComplete="username"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-venture-accent/50 ${
                    errors.username ? "border-destructive" : "border-border focus:border-venture-accent"
                  }`}
                />
              </div>
              {errors.username && <p className="text-destructive text-xs">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-background text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-venture-accent/50 ${
                    errors.password ? "border-destructive" : "border-border focus:border-venture-accent"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}

              {/* Password strength */}
              {form.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i < strengthScore ? strengthColors[strengthScore] : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  {strengthScore > 0 && (
                    <p className="text-xs text-muted-foreground">{strengthLabels[strengthScore]} password</p>
                  )}
                  <div className="space-y-1">
                    {[
                      { key: "length", label: "At least 8 characters" },
                      { key: "uppercase", label: "One uppercase letter" },
                      { key: "number", label: "One number" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        {strength[key as keyof PasswordStrength] ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <X className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className={strength[key as keyof PasswordStrength] ? "text-emerald-500" : "text-muted-foreground"}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-venture-accent hover:bg-venture-accent/90 text-white font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <span className="text-venture-accent">Terms of Service</span>{" "}
              and{" "}
              <span className="text-venture-accent">Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

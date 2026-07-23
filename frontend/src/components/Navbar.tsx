import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Menu, Lightbulb, LogOut, User, Settings, LogIn } from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const NAV_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing" },
];

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [authOpen, setAuthOpen]         = useState(false);
  const [authMode, setAuthMode]         = useState<"signin" | "signup">("signup");
  const [profileOpen, setProfileOpen]   = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  const openAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    setMobileOpen(false);
    await logout();
    toast({ title: "Signed out", description: "See you next time!" });
    navigate("/");
  };

  // Get avatar initials fallback
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "BB";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-5 transition-all duration-500"
        style={{ paddingTop: scrolled ? "12px" : "20px" }}
      >
        {/* ── Dark glass pill ── */}
        <nav
          className="navbar-pill flex items-center w-full"
          style={{
            maxWidth: "860px",
            padding: "8px 8px 8px 20px",
            gap: "0",
            position: "relative",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 mr-auto"
            style={{ textDecoration: "none" }}
          >
            {/* Mark */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3 7.5L6 10.5L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "0.01em",
              }}
            >
              BusinessBud
            </span>
          </Link>

          {/* Centre links — desktop */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="btn-nav-ghost"
                style={{ fontSize: "13px" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {isAuthenticated && user ? (
              /* Authenticated User Menu Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  id="navbar-profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-white/90">{initials}</span>
                    )}
                  </div>
                  <span className="text-[13px] font-medium text-white/80 max-w-[80px] truncate">
                    {user.username}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      background: "rgba(18,17,16,0.95)",
                      backdropFilter: "blur(24px)",
                    }}
                  >
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs font-semibold text-white/90 truncate">{user.username}</p>
                      <p className="text-[11px] text-white/50 truncate">{user.email}</p>
                    </div>

                    {/* Actions */}
                    <div className="p-1 flex flex-col gap-0.5">
                      <Link
                        to="/start"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-white/60" />
                        New Analysis
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-white/60" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-white/60" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-white/5 p-1">
                      <button
                        id="navbar-logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated Buttons */
              <>
                <button
                  onClick={() => openAuth("signin")}
                  className="btn-nav-ghost"
                >
                  Log in
                </button>
                <button
                  onClick={() => openAuth("signup")}
                  className="btn-nav-primary"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden btn-nav-ghost ml-auto"
            style={{ padding: "8px" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div
            className="absolute top-full left-5 right-5 mt-2 rounded-3xl overflow-hidden animate-scale-in"
            style={{
              background: "rgba(14,13,12,0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              maxWidth: "860px",
              margin: "8px auto 0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 40px)",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "15px",
                    fontWeight: 400,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {link.label}
                </button>
              ))}

              <div
                className="mt-2 pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {isAuthenticated && user ? (
                  /* Mobile Authenticated User Block */
                  <div className="flex flex-col gap-2 p-1">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-white/90">{initials}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white/90 truncate">{user.username}</p>
                        <p className="text-xs text-white/40 truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Link
                        to="/start"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 text-center py-2.5 rounded-xl bg-white/10 text-white/90 text-sm font-medium hover:bg-white/15 transition-all"
                      >
                        New Analysis
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex-1 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/15 transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mobile Unauthenticated Buttons */
                  <div className="flex gap-2">
                    <button
                      onClick={() => openAuth("signin")}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        fontWeight: 500,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => openAuth("signup")}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.95)",
                        color: "#111",
                        fontSize: "14px",
                        fontWeight: 500,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;

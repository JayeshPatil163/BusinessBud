import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import AuthModal from "./AuthModal";

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
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "28px 24px",
      }}
    >
      <div
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5"
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.5L6 10.5L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-2)",
              letterSpacing: "0.01em",
            }}
          >
            BusinessBud
          </span>
        </Link>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[
            { label: "Home",    to: "/" },
            { label: "Start",   to: "/start" },
            { label: "Privacy", to: "#" },
            { label: "Terms",   to: "#" },
          ].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--text-3)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            color: "var(--text-3)",
          }}
        >
          © {new Date().getFullYear()} BusinessBud
        </p>
      </div>
    </footer>
  );
};

export default Footer;

const LOGOS = [
  "Y Combinator", "Sequoia", "a16z", "First Round",
  "Lightspeed", "Techstars", "General Catalyst", "500 Startups",
];

const LogoMarquee = () => {
  const items = [...LOGOS, ...LOGOS];

  return (
    <section
      className="py-10 px-6 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{
          background: "linear-gradient(to right, var(--cream), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{
          background: "linear-gradient(to left, var(--cream), transparent)",
        }}
      />

      <p
        className="text-center mb-6"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          fontWeight: 400,
        }}
      >
        Founders backed by
      </p>

      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {items.map((name, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12.5px",
                fontWeight: 500,
                color: "rgba(0,0,0,0.25)",
                letterSpacing: "0.02em",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;

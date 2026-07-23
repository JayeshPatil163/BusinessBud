const TIERS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For validating your first idea.",
    features: [
      "3 idea analyses / month",
      "Basic market overview",
      "SWOT summary",
      "Competitor snapshot",
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Founder",
    price: "$29",
    period: "/ month",
    description: "For founders who move fast.",
    features: [
      "Unlimited analyses",
      "Deep market intelligence",
      "Full execution roadmap",
      "Financial projections",
      "Investor deck outline",
      "Priority processing",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Studio",
    price: "$99",
    period: "/ month",
    description: "For teams and serial founders.",
    features: [
      "Everything in Founder",
      "5 team seats",
      "White-label exports",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact us",
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-6"
      style={{ background: "var(--cream-2, #efede8)", scrollMarginTop: "80px" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="chip mb-5 inline-flex">Pricing</span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 1.05,
            }}
          >
            Simple, transparent{" "}
            <em style={{ fontStyle: "italic", fontWeight: 800, color: "var(--ink-2)" }}>
              pricing.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "var(--text-3)",
              marginTop: "1rem",
            }}
          >
            Start free. Upgrade when you're ready to move faster.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card ${tier.featured ? "featured" : ""}`}
            >
              {/* Popular tag */}
              {tier.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "4px 12px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  Popular
                </div>
              )}

              {/* Name */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: tier.featured ? "rgba(255,255,255,0.45)" : "var(--text-3)",
                  marginBottom: "20px",
                }}
              >
                {tier.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 800,
                    fontSize: tier.price === "Free" ? "2.4rem" : "3rem",
                    color: tier.featured ? "#fff" : "var(--ink)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    
                  }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: tier.featured ? "rgba(255,255,255,0.4)" : "var(--text-3)",
                    }}
                  >
                    {tier.period}
                  </span>
                )}
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 300,
                  color: tier.featured ? "rgba(255,255,255,0.5)" : "var(--text-2)",
                  lineHeight: 1.5,
                  marginBottom: "28px",
                }}
              >
                {tier.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: tier.featured ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  marginBottom: "24px",
                }}
              />

              {/* Features */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, marginBottom: "28px" }}>
                {tier.features.map((feature) => (
                  <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <path
                        d="M2 7L5.5 10.5L12 3"
                        stroke={tier.featured ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 300,
                        color: tier.featured ? "rgba(255,255,255,0.7)" : "var(--text-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "16px",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: tier.featured ? "none" : "1px solid rgba(0,0,0,0.12)",
                  background: tier.featured ? "rgba(255,255,255,0.95)" : "transparent",
                  color: tier.featured ? "var(--ink)" : "var(--text-1)",
                }}
                onMouseEnter={(e) => {
                  if (tier.featured) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.featured) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.95)";
                  } else {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "var(--text-3)",
            fontWeight: 300,
          }}
        >
          No credit card required for free plan · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default PricingSection;

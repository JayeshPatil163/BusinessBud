
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import FeatureSection from "@/components/FeatureSection";
import PricingSection from "@/components/PricingSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--cream)" }}
    >
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <FeatureSection />
        <PricingSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

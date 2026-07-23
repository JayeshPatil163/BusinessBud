
import CTA from "@/components/CTA";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const Index = () => {
  // Apply dark theme by default
  useEffect(() => {
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <FeatureSection />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

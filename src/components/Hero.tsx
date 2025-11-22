
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BrainCircuit, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-24 pb-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-venture-light dark:bg-venture-accent/20 text-venture-accent mb-6 animate-fade-in">
          <Lightbulb className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Transform your ideas into reality</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <span className="text-gradient">Turn Your Business Ideas</span> Into 
          <br /> Successful Ventures
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
        BusinessBud helps entrepreneurs transform ideas into actionable business plans with AI-powered analysis, roadmaps, and execution support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button 
            size="lg" 
            className="bg-venture-accent hover:bg-venture-accent/90 text-white"
            onClick={() => navigate("/start")}
          >
            Start Your Venture
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          
          <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="card-gradient rounded-2xl p-4 flex items-center gap-3 text-sm text-muted-foreground">
            <BrainCircuit className="h-5 w-5 text-venture-accent" />
            <span>Powered by advanced AI to analyze and enhance your business ideas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


import { BarChart3, Calendar, CheckSquare, Lightbulb, Rocket, TrendingUp, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
  const features = [
    {
      title: "Idea Analysis",
      description: "Get AI-powered analysis of your business idea with insights on feasibility and market potential.",
      icon: Lightbulb,
      color: "bg-venture-primary",
      delay: 0
    },
    {
      title: "Market Research",
      description: "Discover similar businesses, market gaps, and opportunities to differentiate your venture.",
      icon: BarChart3,
      color: "bg-venture-accent",
      delay: 1
    },
    {
      title: "Execution Roadmap",
      description: "Receive a detailed step-by-step plan to take your idea from concept to launch.",
      icon: Rocket,
      color: "bg-venture-cta",
      delay: 2
    },
    {
      title: "Task Management",
      description: "Organize your business launch with integrated task management and calendar tools.",
      icon: CheckSquare,
      color: "bg-emerald-500",
      delay: 3
    },
    {
      title: "Progress Tracking",
      description: "Monitor your business growth and milestone achievements with visual analytics.",
      icon: TrendingUp,
      color: "bg-blue-500",
      delay: 4
    },
    {
      title: "Funding Connection",
      description: "Connect with potential investors interested in ventures like yours.",
      icon: Users,
      color: "bg-amber-500",
      delay: 5
    }
  ];
  
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How VentureBloom Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform provides everything you need to turn your business idea into reality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

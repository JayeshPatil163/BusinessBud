
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color = "bg-venture-primary", 
  delay = 0 
}: FeatureCardProps) => {
  const animationDelay = `${delay * 100}ms`;
  
  return (
    <div 
      className="card-gradient rounded-xl p-6 opacity-0 animate-fade-in hover-scale"
      style={{ animationDelay }}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        color
      )}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;

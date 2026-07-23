
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto card-gradient rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your <span className="text-gradient">Business Idea</span>?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of entrepreneurs who've successfully launched their ventures with our platform.
        </p>
        <Button 
          size="lg" 
          className="bg-venture-accent hover:bg-venture-accent/90 text-white"
          onClick={() => navigate("/start")}
        >
          Start Your Venture
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CTA;

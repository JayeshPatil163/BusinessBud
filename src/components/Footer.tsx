
import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-venture-accent" />
            <span className="font-bold">BusinessBud</span>
          </div>
          
          <div className="flex gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BusinessBud. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

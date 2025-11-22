
import { Button } from "@/components/ui/button";
import { Lightbulb, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 card-gradient border-b h-16 px-4 md:px-6">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {toggleSidebar && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-venture-accent" />
            <span className="font-bold text-xl">BusinessBud</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/start">
            <Button className="bg-venture-accent hover:bg-venture-accent/90 text-white">
              Start Your Venture
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

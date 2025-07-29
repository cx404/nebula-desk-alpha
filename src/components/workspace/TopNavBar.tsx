import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TopNavBarProps {
  children?: React.ReactNode;
}

export const TopNavBar = ({ children }: TopNavBarProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border/20 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <Button
          variant="ghost"
          onClick={handleLogoClick}
          className="text-xl font-bold text-foreground hover:text-primary hover:bg-primary/10 transition-all"
        >
          LOGO
        </Button>

        {/* Right side content */}
        <div className="flex items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};
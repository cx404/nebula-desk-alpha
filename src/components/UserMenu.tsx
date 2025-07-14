import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <Button 
      onClick={handleLogin}
      variant="outline" 
      className="border-white/20 text-white hover:bg-white/10"
    >
      <LogIn className="w-4 h-4 mr-2" />
      登录
    </Button>
  );
};
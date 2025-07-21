import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  onProfileClick?: () => void;
}

export const UserMenu = ({ onProfileClick }: UserMenuProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查当前用户状态
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (user) {
    return (
      <Button 
        variant="ghost" 
        className="h-8 w-8 rounded-full"
        onClick={onProfileClick}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-purple-500 text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <>
      <Button 
        onClick={handleLogin}
        variant="outline" 
        className="border-white/20 text-white hover:bg-white/10"
      >
        <LogIn className="w-4 h-4 mr-2" />
        登录
      </Button>
      
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
    </>
  );
};
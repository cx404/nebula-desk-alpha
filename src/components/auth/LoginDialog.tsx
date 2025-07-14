import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, QrCode, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginDialog = ({ open, onOpenChange }: LoginDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePhoneAuth = async () => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        // 注册流程 - 使用邮箱作为用户名，手机号作为显示名
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            emailRedirectTo: `${window.location.origin}/workspace`,
            data: {
              phone: phone,
              display_name: phone
            }
          }
        });
        
        if (error) {
          toast({
            variant: "destructive",
            title: "注册失败",
            description: error.message,
          });
        } else {
          toast({
            title: "注册成功",
            description: "请检查邮箱验证链接完成注册",
          });
        }
      } else {
        // 登录流程
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          toast({
            variant: "destructive",
            title: "登录失败",
            description: error.message,
          });
        } else {
          toast({
            title: "登录成功",
            description: "正在跳转到工作空间...",
          });
          onOpenChange(false);
          navigate("/workspace");
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "操作失败",
        description: "请检查网络连接后重试",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRCodeAuth = () => {
    // 直接跳转到工作空间页面
    toast({
      title: "登录成功",
      description: "正在跳转到工作空间...",
    });
    onOpenChange(false);
    navigate("/workspace");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            欢迎登录
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            选择您的登录方式
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="phone" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              手机登录
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              二维码登录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handlePhoneAuth}
                disabled={isLoading || !phone || !password || !email}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? "处理中..." : isSignUp ? "注册" : "登录"}
              </Button>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {isSignUp ? "已有账号？立即登录" : "没有账号？立即注册"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode" className="space-y-4 mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                <div className="text-center space-y-2">
                  <QrCode className="w-16 h-16 mx-auto text-purple-500" />
                  <p className="text-sm text-gray-600">扫描二维码登录</p>
                  <p className="text-xs text-gray-400">使用手机扫描上方二维码</p>
                </div>
              </div>
              
              <Button
                onClick={handleQRCodeAuth}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? "登录中..." : "模拟扫码登录"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
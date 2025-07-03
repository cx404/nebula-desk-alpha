import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import techBg from "@/assets/tech-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [alayaAccount, setAlayaAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 模拟登录逻辑
    navigate("/projects");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${techBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-20">
        {/* Logo and title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl mx-auto mb-4 flex items-center justify-center glow">
            <div className="w-8 h-8 bg-primary rounded-lg animate-glow"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            算力云桌面
          </h1>
          <p className="text-muted-foreground mt-2">强大的云端计算体验</p>
        </div>

        {/* Login form */}
        <Card className="glass-card p-8 animate-slide-in">
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="phone">手机号登录</TabsTrigger>
              <TabsTrigger value="alaya">Alaya NeW</TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">手机号</label>
                  <Input
                    type="tel"
                    placeholder="请输入手机号"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">验证码</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="text"
                      placeholder="请输入验证码"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" className="shrink-0">
                      获取验证码
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alaya" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Alaya NeW 账号</label>
                  <Input
                    type="text"
                    placeholder="请输入账号"
                    value={alayaAccount}
                    onChange={(e) => setAlayaAccount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">密码</label>
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            <Button 
              onClick={handleLogin} 
              className="w-full mt-6 btn-premium"
              size="lg"
            >
              立即登录
            </Button>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              登录即表示同意 
              <span className="text-primary cursor-pointer hover:underline">用户协议</span> 和 
              <span className="text-primary cursor-pointer hover:underline">隐私政策</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
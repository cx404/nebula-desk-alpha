import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserMenu } from "@/components/UserMenu";

const Workspace = () => {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: "assistant", content: "您好！我是您的AI助手，有什么可以帮助您的吗？" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const navItems = [
    { id: "dashboard", name: "仪表盘", icon: "📊" },
    { id: "compute", name: "算力管理", icon: "⚡" },
    { id: "environment", name: "开发环境", icon: "💻" },
    { id: "dataset", name: "数据集", icon: "📁" },
    { id: "tasks", name: "任务管理", icon: "📋" },
    { id: "model", name: "模型部署", icon: "🚀" },
    { id: "inference", name: "推理服务", icon: "🔮" },
  ];

  const workspaceItems = [
    { id: "notebook", name: "Jupyter Notebook", icon: "📓", x: 100, y: 100 },
    { id: "vscode", name: "VS Code", icon: "💻", x: 250, y: 100 },
    { id: "terminal", name: "Terminal", icon: "⚡", x: 400, y: 100 },
    { id: "browser", name: "Browser", icon: "🌐", x: 100, y: 250 },
    { id: "docker", name: "Docker", icon: "🐳", x: 250, y: 250 },
    { id: "git", name: "Git Client", icon: "📋", x: 400, y: 250 },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { id: Date.now(), type: "user", content: newMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, type: "assistant", content: "我已经收到您的消息，正在为您处理..." };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg flex-shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">算力云桌面</h1>
              <p className="text-sm text-muted-foreground">智能工作空间</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              运行中
            </Badge>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Navigation */}
        <div className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-lg flex-shrink-0">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">导航菜单</h3>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={selectedNav === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setSelectedNav(item.id)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Center - Workspace Canvas */}
        <div className="flex-1 overflow-auto">
          <div className="h-full p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">自定义工作空间</h2>
              <p className="text-muted-foreground">拖拽组件创建您的专属工作环境</p>
            </div>
            
            {/* Workspace Canvas */}
            <div className="relative h-[600px] bg-card/20 rounded-lg border-2 border-dashed border-border/50 overflow-hidden">
              {workspaceItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute w-20 h-20 bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 flex flex-col items-center justify-center cursor-move hover:scale-105 transition-transform group"
                  style={{ left: item.x, top: item.y }}
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs text-center leading-tight">{item.name}</span>
                </div>
              ))}
              
              {/* Add Component Button */}
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" className="bg-card/80 backdrop-blur-lg">
                  ➕ 添加组件
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Chat */}
        <div className="w-80 border-l border-border/50 bg-card/30 backdrop-blur-lg flex-shrink-0 flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h3 className="text-lg font-semibold">AI 助手</h3>
            <p className="text-sm text-muted-foreground">智能对话助手</p>
          </div>
          
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/80 backdrop-blur-lg border border-border/50'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                placeholder="输入消息..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
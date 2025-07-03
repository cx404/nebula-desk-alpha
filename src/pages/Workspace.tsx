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

  // 渲染不同导航项的内容看板
  const renderContent = () => {
    switch (selectedNav) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">仪表盘</h2>
              <p className="text-muted-foreground">项目总览和系统状态</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">活跃项目</h3>
                    <p className="text-2xl font-bold text-primary">3</p>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">算力使用</h3>
                    <p className="text-2xl font-bold text-green-400">78%</p>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">今日费用</h3>
                    <p className="text-2xl font-bold text-blue-400">¥126</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      
      case "compute":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">算力管理</h2>
              <p className="text-muted-foreground">管理和监控计算资源</p>
            </div>
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">GPU 实例</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                  <div>
                    <p className="font-medium">NVIDIA A100</p>
                    <p className="text-sm text-muted-foreground">80GB 显存</p>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    运行中
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                  <div>
                    <p className="font-medium">NVIDIA V100</p>
                    <p className="text-sm text-muted-foreground">32GB 显存</p>
                  </div>
                  <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                    已停止
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "environment":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">开发环境</h2>
              <p className="text-muted-foreground">管理您的开发环境配置</p>
            </div>
            <div className="relative h-[400px] bg-card/20 rounded-lg border-2 border-dashed border-border/50 overflow-hidden">
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
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" className="bg-card/80 backdrop-blur-lg">
                  ➕ 添加组件
                </Button>
              </div>
            </div>
          </div>
        );
      
      case "dataset":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">数据集</h2>
              <p className="text-muted-foreground">管理训练和测试数据集</p>
            </div>
            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">我的数据集</h3>
                <Button variant="outline" size="sm">
                  ➕ 上传数据集
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <p className="font-medium">CIFAR-10</p>
                      <p className="text-xs text-muted-foreground">图像分类数据集</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">50MB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📝</span>
                    <div>
                      <p className="font-medium">Text Corpus</p>
                      <p className="text-xs text-muted-foreground">自然语言处理数据</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">128MB</span>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "tasks":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">任务管理</h2>
              <p className="text-muted-foreground">监控训练任务和作业状态</p>
            </div>
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">运行中的任务</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">图像分类模型训练</h4>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      训练中
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">ResNet50 在 CIFAR-10 数据集上的训练</p>
                  <div className="w-full bg-border/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Epoch 65/100</p>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "model":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">模型部署</h2>
              <p className="text-muted-foreground">部署和管理AI模型</p>
            </div>
            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">已部署模型</h3>
                <Button variant="outline" size="sm">
                  🚀 部署新模型
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">GPT-3.5 微调模型</h4>
                      <p className="text-sm text-muted-foreground">文本生成模型</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        在线
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">QPS: 45</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "inference":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">推理服务</h2>
              <p className="text-muted-foreground">API接口和推理性能监控</p>
            </div>
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">API 端点</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      https://api.example.com/v1/chat/completions
                    </code>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      活跃
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">今日调用</p>
                      <p className="font-semibold">1,234</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">平均延迟</p>
                      <p className="font-semibold">150ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">成功率</p>
                      <p className="font-semibold">99.9%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">自定义工作空间</h2>
              <p className="text-muted-foreground">拖拽组件创建您的专属工作环境</p>
            </div>
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
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" className="bg-card/80 backdrop-blur-lg">
                  ➕ 添加组件
                </Button>
              </div>
            </div>
          </div>
        );
    }
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

        {/* Center - Dynamic Content */}
        <div className="flex-1 overflow-auto">
          <div className="h-full p-6">
            {renderContent()}
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
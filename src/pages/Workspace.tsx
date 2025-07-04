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
              <h2 className="text-2xl font-bold mb-2 text-white">仪表盘</h2>
              <p className="text-gray-400">项目总览和系统状态</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">活跃项目</h3>
                    <p className="text-3xl font-bold text-blue-400">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">算力使用</h3>
                    <p className="text-3xl font-bold text-green-400">78%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">今日费用</h3>
                    <p className="text-3xl font-bold text-purple-400">¥126</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "compute":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">算力管理</h2>
              <p className="text-gray-400">管理和监控计算资源</p>
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
              <h2 className="text-2xl font-bold mb-2 text-white">开发环境</h2>
              <p className="text-gray-400">管理您的开发环境配置</p>
            </div>
            <div className="relative h-[500px] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <div className="relative p-6 h-full">
                <div className="grid grid-cols-4 gap-6 h-full">
                  {workspaceItems.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer transform hover:scale-105 transition-all duration-200"
                    >
                      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col items-center justify-center">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-white font-medium text-center">{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    ➕ 添加组件
                  </Button>
                </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <span className="text-lg font-semibold text-white">算力云桌面</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left justify-start ${
                selectedNav === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setSelectedNav(item.id)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">工作空间</h1>
              <p className="text-gray-400 mt-1">自定义您的云桌面环境</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                运行中
              </Badge>
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="h-full">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Right AI Chat */}
      <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <span className="text-lg font-semibold text-white">AI助手</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-200 border border-white/20'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              placeholder="输入消息..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-500"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
            >
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
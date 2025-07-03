import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Workspace = () => {
  const [selectedApp, setSelectedApp] = useState<string>("");

  const apps = [
    { id: "vscode", name: "VS Code", icon: "💻", status: "running", color: "bg-blue-500" },
    { id: "chrome", name: "Chrome", icon: "🌐", status: "stopped", color: "bg-green-500" },
    { id: "docker", name: "Docker", icon: "🐳", status: "running", color: "bg-cyan-500" },
    { id: "terminal", name: "Terminal", icon: "⚡", status: "running", color: "bg-yellow-500" },
    { id: "jupyter", name: "Jupyter", icon: "📊", status: "stopped", color: "bg-orange-500" },
    { id: "figma", name: "Figma", icon: "🎨", status: "stopped", color: "bg-purple-500" },
    { id: "git", name: "Git", icon: "📋", status: "running", color: "bg-red-500" },
    { id: "npm", name: "NPM", icon: "📦", status: "stopped", color: "bg-pink-500" },
  ];

  const quickActions = [
    { name: "新建文件", icon: "📄", action: () => {} },
    { name: "打开终端", icon: "⚡", action: () => {} },
    { name: "Git 推送", icon: "⬆️", action: () => {} },
    { name: "部署应用", icon: "🚀", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">我的项目</h1>
              <p className="text-sm text-muted-foreground">Web 开发环境</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              运行中
            </Badge>
            <div className="text-right">
              <p className="text-sm font-medium">张三</p>
              <p className="text-xs text-muted-foreground">Premium 用户</p>
            </div>
            <Avatar className="w-10 h-10 ring-2 ring-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary">张</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Apps grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">应用程序</h2>
              <p className="text-muted-foreground">管理您的开发工具和应用</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {apps.map((app, index) => (
                <Card
                  key={app.id}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-in group ${
                    selectedApp === app.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedApp(app.id)}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 ${app.color} rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform`}>
                      {app.icon}
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{app.name}</h3>
                    <Badge 
                      variant={app.status === 'running' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        app.status === 'running' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {app.status === 'running' ? '运行中' : '已停止'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-4">快捷操作</h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-primary/10"
                    onClick={action.action}
                  >
                    <span className="text-lg">{action.icon}</span>
                    {action.name}
                  </Button>
                ))}
              </div>
            </Card>

            {/* System info */}
            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold mb-4">系统状态</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CPU 使用率</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">32%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">内存使用</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-accent rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">4.2GB</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">存储空间</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">12GB</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project settings */}
            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-semibold mb-4">项目设置</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  ⚙️ 环境配置
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  💾 保存快照
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  📤 导出项目
                </Button>
                <Button variant="destructive" className="w-full justify-start gap-3 bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
                  🗑️ 删除项目
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
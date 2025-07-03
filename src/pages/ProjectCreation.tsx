import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProjectCreation = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const creationMethods = [
    {
      id: "template",
      title: "模板创建",
      description: "从预设模板快速创建项目",
      icon: "🚀",
      features: ["快速部署", "预配置环境", "最佳实践"],
      recommended: true
    },
    {
      id: "custom",
      title: "自定义创建",
      description: "根据需求自定义配置项目",
      icon: "⚙️",
      features: ["完全自定义", "灵活配置", "高级选项"]
    },
    {
      id: "import",
      title: "导入项目",
      description: "导入现有代码仓库或项目",
      icon: "📁",
      features: ["Git导入", "文件上传", "迁移工具"]
    }
  ];

  const handleCreateProject = () => {
    navigate("/workspace");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded"></div>
            </div>
            <span className="text-xl font-semibold">算力云桌面</span>
          </div>
          
          <div className="flex items-center gap-4">
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
        {/* Page title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">创建新项目</h1>
          <p className="text-muted-foreground">选择创建方式，开始您的云端开发之旅</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Creation methods */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {creationMethods.map((method, index) => (
                <Card 
                  key={method.id}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-slide-in ${
                    selectedMethod === method.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{method.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{method.title}</h3>
                        {method.recommended && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            推荐
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{method.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {method.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Project configuration */}
          <div className="space-y-6">
            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-4">项目配置</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">项目名称</label>
                  <Input
                    placeholder="输入项目名称"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">项目描述</label>
                  <Textarea
                    placeholder="描述您的项目"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1 min-h-20"
                  />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold mb-4">资源配置</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CPU 核心</span>
                  <Badge variant="outline">4 核</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">内存</span>
                  <Badge variant="outline">8 GB</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">存储</span>
                  <Badge variant="outline">50 GB</Badge>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">预估费用</span>
                    <span className="text-primary font-semibold">¥12/小时</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleCreateProject}
              className="w-full btn-premium"
              size="lg"
              disabled={!selectedMethod || !projectName}
            >
              创建项目
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;
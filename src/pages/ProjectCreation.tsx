import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "@/hooks/useWorkspace";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserMenu } from "@/components/UserMenu";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Settings, FileText } from "lucide-react";
const ProjectCreation = () => {
  const navigate = useNavigate();
  const { createWorkspace } = useWorkspace();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const templates = [{
    id: "react",
    name: "React + TypeScript",
    description: "现代前端开发框架"
  }, {
    id: "python",
    name: "Python + Jupyter",
    description: "数据科学和机器学习"
  }, {
    id: "nodejs",
    name: "Node.js + Express",
    description: "后端API开发"
  }, {
    id: "pytorch",
    name: "PyTorch + CUDA",
    description: "深度学习训练环境"
  }, {
    id: "tensorflow",
    name: "TensorFlow + GPU",
    description: "AI模型开发"
  }];
  const creationMethods = [{
    id: "template",
    title: "模板创建",
    description: "从预设模板快速创建项目",
    icon: Rocket,
    features: ["快速部署", "预配置环境", "最佳实践"],
    recommended: true
  }, {
    id: "custom",
    title: "自定义创建",
    description: "根据需求自定义配置项目",
    icon: Settings,
    features: ["完全自定义", "灵活配置", "高级选项"]
  }, {
    id: "blank",
    title: "空白创建",
    description: "从零开始创建全新项目",
    icon: FileText,
    features: ["完全空白", "自由搭建", "无限可能"]
  }];
  // AI组件生成逻辑
  const generateComponentsFromRequirements = (requirements: string) => {
    const components = [];
    const req = requirements.toLowerCase();
    
    // 基础开发环境
    if (req.includes("开发") || req.includes("编程") || req.includes("代码")) {
      components.push({
        id: `vscode-${Date.now()}`,
        name: "VS Code",
        icon: "💻",
        x: 100,
        y: 100,
        type: "code-editor",
        status: "idle"
      });
      components.push({
        id: `terminal-${Date.now()}`,
        name: "Terminal",
        icon: "⚡",
        x: 280,
        y: 100,
        type: "terminal",
        status: "idle"
      });
    }

    // 数据科学和机器学习
    if (req.includes("数据") || req.includes("机器学习") || req.includes("ai") || req.includes("分析")) {
      components.push({
        id: `jupyter-${Date.now()}`,
        name: "Jupyter Notebook",
        icon: "📓",
        x: 100,
        y: 250,
        type: "jupyter",
        status: "idle"
      });
      components.push({
        id: `python-${Date.now()}`,
        name: "Python环境",
        icon: "🐍",
        x: 280,
        y: 250,
        type: "python",
        status: "idle"
      });
    }

    // Web开发
    if (req.includes("网站") || req.includes("前端") || req.includes("后端") || req.includes("web")) {
      components.push({
        id: `browser-${Date.now()}`,
        name: "Browser",
        icon: "🌐",
        x: 460,
        y: 100,
        type: "browser",
        status: "idle"
      });
      if (req.includes("数据库") || req.includes("后端")) {
        components.push({
          id: `database-${Date.now()}`,
          name: "Database Client",
          icon: "🗄️",
          x: 460,
          y: 250,
          type: "database",
          status: "idle"
        });
      }
    }

    // 深度学习和GPU
    if (req.includes("深度学习") || req.includes("训练") || req.includes("gpu") || req.includes("模型")) {
      components.push({
        id: `gpu-monitor-${Date.now()}`,
        name: "GPU Monitor",
        icon: "⚡",
        x: 640,
        y: 100,
        type: "gpu-monitor",
        status: "idle"
      });
      components.push({
        id: `tensorboard-${Date.now()}`,
        name: "TensorBoard",
        icon: "📊",
        x: 640,
        y: 250,
        type: "tensorboard",
        status: "idle"
      });
    }

    // 容器化和部署
    if (req.includes("部署") || req.includes("容器") || req.includes("docker")) {
      components.push({
        id: `docker-${Date.now()}`,
        name: "Docker",
        icon: "🐳",
        x: 820,
        y: 100,
        type: "docker",
        status: "idle"
      });
    }

    // 版本控制
    if (req.includes("版本") || req.includes("git") || req.includes("协作")) {
      components.push({
        id: `git-${Date.now()}`,
        name: "Git Client",
        icon: "📋",
        x: 820,
        y: 250,
        type: "git",
        status: "idle"
      });
    }

    return components;
  };

  const handleCustomCreation = async () => {
    if (!customRequirements.trim()) {
      toast({
        title: "请输入您的需求",
        description: "请描述您想要创建的项目需求",
        variant: "destructive"
      });
      return;
    }

    // AI生成过程
    setIsGenerating(true);
    setIsDialogOpen(false);
    toast({
      title: "AI正在分析您的需求...",
      description: "正在为您智能配置工作空间组件"
    });

    // 模拟AI分析和生成时间
    setTimeout(() => {
      const generatedComponents = generateComponentsFromRequirements(customRequirements);
      
      // 创建新工作空间
      createWorkspace({
        name: projectName || "AI 生成工作空间",
        description: customRequirements,
        type: "custom",
        components: generatedComponents
      });
      
      setIsGenerating(false);
      toast({
        title: "项目生成完成！",
        description: `已为您配置了 ${generatedComponents.length} 个组件，正在跳转到工作空间...`
      });
      navigate("/workspace");
    }, 3000);
  };
  const handleCreateProject = async () => {
    if (selectedMethod === "blank") {
      // 空白创建
      createWorkspace({
        name: projectName || "空白工作空间",
        description: "从零开始创建的空白工作空间",
        type: "blank",
        components: []
      });
      navigate("/workspace");
      return;
    }
    if (selectedMethod === "custom") {
      // 自定义创建需要用户输入需求
      if (!customRequirements.trim()) {
        toast({
          title: "请输入您的需求",
          description: "自定义创建需要您描述项目需求",
          variant: "destructive"
        });
        return;
      }

      // 模拟AI生成过程
      setIsGenerating(true);
      toast({
        title: "AI正在生成项目...",
        description: "请稍候，正在根据您的需求生成项目配置"
      });

      // 模拟生成时间
      setTimeout(() => {
        setIsGenerating(false);
        createWorkspace({
          name: projectName || "AI 生成工作空间",
          description: customRequirements,
          type: "custom",
          components: []
        });
        toast({
          title: "项目生成完成！",
          description: "正在跳转到工作空间..."
        });
        navigate("/workspace");
      }, 3000);
      return;
    }

    // 模板创建
    createWorkspace({
      name: projectName || "模板工作空间",
      description: "基于模板创建的工作空间",
      type: "template",
      components: []
    });
    navigate("/workspace");
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded"></div>
            </div>
            <span className="text-xl font-semibold">算力云桌面</span>
          </div>
          
          <UserMenu />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">创建新项目</h1>
          <p className="text-muted-foreground">选择创建方式，开始您的云端开发之旅</p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="grid gap-6">
              {creationMethods.map((method, index) => <Card key={method.id} className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-slide-in bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 ${selectedMethod === method.id ? 'ring-2 ring-blue-400 bg-blue-500/20' : 'hover:ring-1 hover:ring-blue-400/50'}`} style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={() => {
              if (method.id === "blank") {
                // 空白创建直接跳转到工作空间
                navigate("/workspace");
              } else {
                setSelectedMethod(method.id);
              }
            }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{method.title}</h3>
                          {method.recommended && <Badge variant="secondary" className="bg-primary/10 text-primary">
                              推荐
                            </Badge>}
                        </div>
                        {method.id === "template" && <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="ml-auto">
                                选择模板 ▼
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-lg border-border/50">
                              {templates.map(template => <DropdownMenuItem key={template.id}>
                                  <div>
                                    <div className="font-medium">{template.name}</div>
                                    <div className="text-xs text-muted-foreground">{template.description}</div>
                                  </div>
                                </DropdownMenuItem>)}
                            </DropdownMenuContent>
                          </DropdownMenu>}
                        {method.id === "custom" && <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="ml-auto" onClick={e => {
                          e.stopPropagation();
                          setIsDialogOpen(true);
                        }}>
                                开始对话 💬
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-lg border-border/50">
                              <DialogHeader>
                                <DialogTitle>自定义创建</DialogTitle>
                                <DialogDescription>
                                  请详细描述您的项目需求，AI将为您自动生成项目配置
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <label htmlFor="requirements" className="text-sm font-medium">
                                    项目需求
                                  </label>
                                  <Textarea id="requirements" placeholder="例如：我想创建一个电商网站，需要商品展示、购物车、用户登录等功能..." value={customRequirements} onChange={e => setCustomRequirements(e.target.value)} className="min-h-32" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleCustomCreation} disabled={!customRequirements.trim() || isGenerating} className="btn-premium">
                                  {isGenerating ? "AI生成中..." : "开始生成"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>}
                      </div>
                      <p className="text-muted-foreground mb-4">{method.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {method.features.map(feature => <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>)}
                      </div>
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>

          {/* Project configuration */}
          
        </div>
      </div>
    </div>;
};
export default ProjectCreation;
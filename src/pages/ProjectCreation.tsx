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
import { Rocket, Settings, FileText, Bot, Send, Sparkles } from "lucide-react";
const ProjectCreation = () => {
  const navigate = useNavigate();
  const {
    createWorkspace
  } = useWorkspace();
  const {
    toast
  } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // AI Chat 相关状态
  interface ChatMessage {
    id: number;
    type: "ai" | "user";
    content: string;
    timestamp: Date;
    suggestedComponents?: any[];
  }
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{
    id: 1,
    type: "ai",
    content: "你好！我是您的AI助手，可以帮助您创建完美的工作空间。请告诉我您想要构建什么样的项目？",
    timestamp: new Date()
  }]);
  const [isAIThinking, setIsAIThinking] = useState(false);
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

  // AI聊天功能
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: chatInput,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsAIThinking(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const generatedComponents = generateComponentsFromRequirements(chatInput);
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: `我理解了您的需求！我为您推荐配置以下工作空间组件：${generatedComponents.map(c => c.name).join('、')}。这个配置可以很好地支持您的项目需求。是否现在创建这个工作空间？`,
        timestamp: new Date(),
        suggestedComponents: generatedComponents
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsAIThinking(false);
    }, 2000);
  };
  const handleAICreateWorkspace = (components: any[]) => {
    createWorkspace({
      name: "AI 推荐工作空间",
      description: "基于AI分析生成的工作空间",
      type: "ai-generated",
      components
    });
    toast({
      title: "工作空间创建成功！",
      description: "AI已为您配置了最适合的组件"
    });
    navigate("/workspace");
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
  return <div className="min-h-screen relative overflow-hidden">
      {/* 星空渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 via-purple-900/30 to-pink-900/50"></div>
      
      {/* 星空效果装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-60" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-70" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" style={{
        animationDelay: '3s'
      }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-white rounded-full animate-pulse opacity-90" style={{
        animationDelay: '0.5s'
      }}></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse opacity-40" style={{
        animationDelay: '2.5s'
      }}></div>
      </div>
      
      {/* 光晕效果 */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '1.5s'
    }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '3s'
    }}></div>
      
      {/* Header */}
      <header className="border-b border-white/20 bg-white/5 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-0 my-0 px-0">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <span className="font-semibold text-2xl text-slate-50">Alaya NeW Cross</span>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* 悬浮AI助手图标 */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-50 animate-pulse">
        
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-ping"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* AI 超级聊天界面 */}
        <div className="max-w-6xl mx-auto mb-12">
          {/* AI Chat Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                AI 智能工作空间助手
              </h1>
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <p className="text-xl text-white/90 font-medium">告诉我您的需求，我将为您量身定制完美的工作空间</p>
          </div>

          {/* AI 聊天窗口 - 放大 */}
          <Card className="glass-card border-2 border-white/30 shadow-2xl hover:border-white/50 transition-all duration-300 bg-white/10 backdrop-blur-xl">
            <div className="p-8 px-[24px] py-[23px]">
              {/* 聊天消息区域 - 增大高度 */}
              <div className="h-[500px] overflow-y-auto mb-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
                {chatMessages.map(message => <div key={message.id} className={`flex items-start gap-3 animate-fade-in ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'ai' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-green-500 to-blue-500'}`}>
                      {message.type === 'ai' ? <Bot className="w-4 h-4 text-white" /> : <span className="text-white text-xs font-bold">我</span>}
                    </div>
                     <div className={`max-w-[80%] p-5 rounded-2xl ${message.type === 'ai' ? 'bg-white/15 border border-white/30 text-white' : 'bg-white/20 border border-white/40 text-white'}`}>
                       <p className="text-base">{message.content}</p>
                      {message.suggestedComponents && <div className="mt-3 pt-3 border-t border-border/50">
                          <Button onClick={() => handleAICreateWorkspace(message.suggestedComponents)} className="btn-premium text-sm" size="sm">
                            立即创建工作空间 ✨
                          </Button>
                        </div>}
                    </div>
                  </div>)}
                
                 {isAIThinking && <div className="flex items-start gap-3 animate-fade-in">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                       <Bot className="w-4 h-4 text-white" />
                     </div>
                     <div className="bg-white/15 border border-white/30 p-5 rounded-2xl">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                      animationDelay: '0.1s'
                    }}></div>
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{
                      animationDelay: '0.2s'
                    }}></div>
                         <span className="text-base text-white ml-2">AI正在思考...</span>
                       </div>
                     </div>
                   </div>}
              </div>

              {/* 输入区域 */}
              <div className="flex gap-4">
                <Input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="描述您想要创建的项目，比如：我想做一个电商网站..." onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 border-white/20 focus:border-white/40 bg-white/10 text-white placeholder:text-white/60 text-lg px-6 rounded-xl py-0" />
                <Button onClick={handleSendMessage} disabled={!chatInput.trim() || isAIThinking} className="btn-premium px-8 py-4 text-lg rounded-xl">
                  <Send className="w-5 h-5 mr-2" />
                  发送
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 传统创建方式 - 缩小占比，更低调 */}
        <div className="max-w-2xl mx-auto opacity-70 hover:opacity-90 transition-opacity duration-300">
          <div className="text-center mb-4">
            <p className="text-xs text-white/60">或者选择传统创建方式</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* 简化的模板创建 */}
            <Card className="p-3 cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-blue-400/30 rounded-lg flex items-center justify-center">
                  <Rocket className="w-3 h-3 text-blue-300" />
                </div>
                <h3 className="text-sm font-medium text-white">模板创建</h3>
              </div>
              <p className="text-xs text-white/60 mb-2">从预设模板快速创建</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    选择模板
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-lg border-border/50">
                  {templates.map(template => <DropdownMenuItem key={template.id} onClick={() => {
                  createWorkspace({
                    name: `${template.name} 工作空间`,
                    description: template.description,
                    type: "template",
                    components: []
                  });
                  navigate("/workspace");
                }}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">{template.description}</div>
                      </div>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>

            {/* 简化的空白创建 */}
            <Card className="p-3 cursor-pointer hover:scale-105 transition-all duration-300 bg-white/5 border-white/20" onClick={() => {
            createWorkspace({
              name: "空白工作空间",
              description: "从零开始创建的空白工作空间",
              type: "blank",
              components: []
            });
            navigate("/workspace");
          }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-purple-400/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 text-purple-300" />
                </div>
                <h3 className="text-sm font-medium text-white">空白创建</h3>
              </div>
              <p className="text-xs text-white/60 mb-2">从零开始创建全新项目</p>
              <Button variant="outline" size="sm" className="w-full text-xs border-white/20 text-white/80 hover:bg-white/10">
                立即创建
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default ProjectCreation;
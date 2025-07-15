import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, Bot, ChevronLeft, ChevronRight, Sparkles, Cog, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  step?: string;
  progress?: number;
}

interface WorkspaceCreationStep {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "error";
  progress: number;
  duration?: number;
}

interface AIWorkspaceNavigatorProps {
  isVisible: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  creationHistory?: Message[];
  onClose?: () => void;
}

export const AIWorkspaceNavigator = ({ 
  isVisible, 
  isCollapsed, 
  onToggleCollapse, 
  creationHistory = [],
  onClose 
}: AIWorkspaceNavigatorProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "system",
      content: "🚀 AI工作空间创建器已启动！正在为您准备智能化的工作环境...",
      timestamp: new Date(),
    },
    ...creationHistory
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creationSteps, setCreationSteps] = useState<WorkspaceCreationStep[]>([
    {
      id: "analyze",
      name: "需求分析",
      description: "分析用户需求和AI建议",
      status: "completed",
      progress: 100,
      duration: 2
    },
    {
      id: "design",
      name: "架构设计",
      description: "设计工作空间布局和组件配置",
      status: "completed",
      progress: 100,
      duration: 3
    },
    {
      id: "components",
      name: "组件生成",
      description: "创建智能组件和连接器",
      status: "running",
      progress: 75,
    },
    {
      id: "optimize",
      name: "性能优化",
      description: "优化资源分配和性能配置",
      status: "pending",
      progress: 0,
    },
    {
      id: "deploy",
      name: "部署完成",
      description: "启动工作空间并进行最终检查",
      status: "pending",
      progress: 0,
    }
  ]);

  const [activeTab, setActiveTab] = useState<"process" | "chat">("process");

  useEffect(() => {
    // 模拟创建过程
    if (creationHistory.length > 0) {
      setIsCreating(true);
      simulateCreationProcess();
    }
  }, [creationHistory]);

  const simulateCreationProcess = () => {
    const intervals: NodeJS.Timeout[] = [];
    
    // 模拟组件生成过程
    intervals.push(setTimeout(() => {
      setCreationSteps(prev => prev.map(step => 
        step.id === "components" 
          ? { ...step, progress: 90 }
          : step
      ));
      
      addSystemMessage("✨ 正在生成Jupyter Notebook组件...");
    }, 1000));

    intervals.push(setTimeout(() => {
      setCreationSteps(prev => prev.map(step => 
        step.id === "components" 
          ? { ...step, status: "completed", progress: 100, duration: 5 }
          : step.id === "optimize"
          ? { ...step, status: "running", progress: 30 }
          : step
      ));
      
      addSystemMessage("🔧 组件生成完成！开始性能优化...");
    }, 3000));

    intervals.push(setTimeout(() => {
      setCreationSteps(prev => prev.map(step => 
        step.id === "optimize" 
          ? { ...step, progress: 80 }
          : step
      ));
      
      addSystemMessage("⚡ 正在优化GPU资源分配...");
    }, 5000));

    intervals.push(setTimeout(() => {
      setCreationSteps(prev => prev.map(step => 
        step.id === "optimize" 
          ? { ...step, status: "completed", progress: 100, duration: 3 }
          : step.id === "deploy"
          ? { ...step, status: "running", progress: 50 }
          : step
      ));
      
      addSystemMessage("🚀 开始部署工作空间...");
    }, 7000));

    intervals.push(setTimeout(() => {
      setCreationSteps(prev => prev.map(step => 
        step.id === "deploy" 
          ? { ...step, status: "completed", progress: 100, duration: 2 }
          : step
      ));
      
      addSystemMessage("🎉 工作空间创建完成！所有组件已就绪，可以开始工作了！");
      setIsCreating(false);
      toast.success("AI工作空间创建成功！");
    }, 9000));

    return () => intervals.forEach(clearTimeout);
  };

  const addSystemMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: "system",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "assistant",
        content: "我正在处理您的请求，请稍候...",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: WorkspaceCreationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "running":
        return <Cog className="w-4 h-4 text-blue-400 animate-spin" />;
      case "error":
        return <div className="w-4 h-4 rounded-full bg-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 right-0 h-full z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-96'
    }`}>
      <Card className="h-full bg-gradient-to-b from-purple-900/40 via-purple-800/50 to-purple-700/40 backdrop-blur-xl border-l border-purple-500/30 shadow-2xl rounded-none">
        <div className="h-full flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI工作空间</h3>
                  <p className="text-xs text-purple-200">智能创建助手</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              {!isCollapsed && onClose && (
                <Button
                  onClick={onClose}
                  size="sm"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-700/50"
                >
                  关闭
                </Button>
              )}
              <Button
                onClick={onToggleCollapse}
                size="sm"
                variant="ghost"
                className="text-purple-300 hover:text-white hover:bg-purple-700/50"
              >
                {isCollapsed ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {!isCollapsed && (
            <>
              {/* 标签页 */}
              <div className="flex border-b border-purple-500/20">
                <Button
                  variant={activeTab === "process" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("process")}
                  className={`flex-1 rounded-none ${
                    activeTab === "process" 
                      ? "bg-purple-500/30 text-white border-b-2 border-purple-400" 
                      : "text-purple-300 hover:text-white hover:bg-purple-700/30"
                  }`}
                >
                  <Cog className="w-4 h-4 mr-2" />
                  创建过程
                </Button>
                <Button
                  variant={activeTab === "chat" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 rounded-none ${
                    activeTab === "chat" 
                      ? "bg-purple-500/30 text-white border-b-2 border-purple-400" 
                      : "text-purple-300 hover:text-white hover:bg-purple-700/30"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  对话历史
                </Button>
              </div>

              {/* 内容区域 */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {activeTab === "process" ? (
                  <>
                    {/* 创建步骤 */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">创建进度</h4>
                          <div className="space-y-3">
                            {creationSteps.map((step, index) => (
                              <div key={step.id} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                  {getStatusIcon(step.status)}
                                  {index < creationSteps.length - 1 && (
                                    <div className={`w-0.5 h-8 mt-2 ${
                                      step.status === "completed" ? "bg-green-400/30" : "bg-gray-600"
                                    }`} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-white text-sm font-medium">{step.name}</h5>
                                    {step.duration && step.status === "completed" && (
                                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                                        {step.duration}s
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-purple-200 text-xs mb-2">{step.description}</p>
                                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div 
                                      className={`h-1.5 rounded-full transition-all duration-500 ${
                                        step.status === "completed" ? "bg-green-400" :
                                        step.status === "running" ? "bg-blue-400" :
                                        step.status === "error" ? "bg-red-400" : "bg-gray-600"
                                      }`}
                                      style={{ width: `${step.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </>
                ) : (
                  <>
                    {/* 消息列表 */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div className="flex items-start gap-2 max-w-[85%]">
                              {message.type !== "user" && (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  message.type === "system" ? "bg-gradient-to-br from-purple-500 to-pink-500" :
                                  "bg-gradient-to-br from-blue-500 to-cyan-500"
                                }`}>
                                  {message.type === "system" ? (
                                    <Sparkles className="w-3 h-3 text-white" />
                                  ) : (
                                    <Bot className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              )}
                              <div
                                className={`p-3 rounded-lg text-sm ${
                                  message.type === "user"
                                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                                    : message.type === "system"
                                    ? "bg-purple-500/20 text-purple-100 border border-purple-400/30"
                                    : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                                }`}
                              >
                                <div className="whitespace-pre-line">{message.content}</div>
                                <div className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* 输入区域 */}
                    <div className="p-4 border-t border-purple-500/20">
                      <div className="flex gap-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="与AI助手对话..."
                          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400"
                        />
                        <Button
                          onClick={handleSendMessage}
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* 折叠状态的内容 */}
          {isCollapsed && (
            <div className="flex-1 flex flex-col items-center justify-center p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {isCreating && (
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mb-2" />
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
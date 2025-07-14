import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquare, Search, Bot, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export const FloatingAIChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "您好！我是Alaya AI助手，可以帮您对话或搜索文档。试试说'搜索工作空间文档'或'创建新组件'？",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"chat" | "search">("chat");

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
      let response = "我正在为您处理...";
      const message = inputValue.toLowerCase();

      if (mode === "search") {
        if (message.includes("文档")) {
          response = "🔍 搜索到相关文档：\n• 工作空间快速开始指南\n• 组件配置说明\n• API接口文档\n• 故障排除指南";
        } else if (message.includes("组件")) {
          response = "🔍 找到以下组件文档：\n• Jupyter Notebook 使用教程\n• Terminal 配置指南\n• GPU监控组件说明\n• 模型部署最佳实践";
        } else {
          response = `🔍 搜索关键词"${inputValue}"的相关文档正在加载...`;
        }
      } else {
        if (message.includes("创建") || message.includes("新建")) {
          response = "💡 我可以帮您创建新组件！请告诉我需要什么类型的组件，比如：\n• Jupyter Notebook\n• Terminal\n• GPU监控器\n• 模型训练器";
        } else if (message.includes("部署")) {
          response = "🚀 我来帮您部署！请提供：\n• 模型类型\n• 资源需求\n• 部署环境\n我会自动配置最佳部署方案。";
        } else if (message.includes("优化")) {
          response = "⚡ 建议优化方案：\n• 启用自动资源调度\n• 配置GPU共享池\n• 优化模型推理效率\n• 设置成本预警";
        } else {
          response = "收到您的消息！我可以帮您管理工作空间、搜索文档、部署模型等。有什么具体需要帮助的吗？";
        }
      }

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "assistant",
        content: response,
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

  return (
    <>
      {/* 展开的聊天界面 - 右侧竖向对话栏 */}
      {isExpanded && (
        <div className="fixed top-0 right-0 h-full w-96 z-40 p-4">
          <Card className="h-full bg-gradient-to-b from-purple-900/20 via-purple-800/30 to-purple-700/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl">
            <div className="h-full flex flex-col p-6">
            {/* 标题栏 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-white">AI助手</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={mode === "chat" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("chat")}
                  className={mode === "chat" ? "bg-purple-500 hover:bg-purple-600" : "text-purple-300 hover:text-white hover:bg-purple-700/50"}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  对话
                </Button>
                <Button
                  variant={mode === "search" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("search")}
                  className={mode === "search" ? "bg-purple-500 hover:bg-purple-600" : "text-purple-300 hover:text-white hover:bg-purple-700/50"}
                >
                  <Search className="w-4 h-4 mr-1" />
                  搜索
                </Button>
              </div>
            </div>

            {/* 消息列表 */}
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                          : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      {message.timestamp && (
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* 输入区域 */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={mode === "chat" ? "输入消息..." : "搜索文档..."}
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
          </Card>
        </div>
      )}

      {/* 悬浮长条 - 底部居中 */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 backdrop-blur-xl border border-purple-500/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-3 px-6 py-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              {!isExpanded && (
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsExpanded(true)}
                  placeholder="AI对话或搜索文档..."
                  className="bg-transparent border-none text-white placeholder:text-white/70 focus:ring-0 w-64"
                />
              )}
              {isExpanded && (
                <span className="text-white text-sm">AI助手已展开</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isExpanded && (
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10 p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10 p-2"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
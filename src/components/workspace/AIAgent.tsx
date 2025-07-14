import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, X } from "lucide-react";
interface AIAgentProps {
  onExecuteCommand: (command: string) => Promise<string>;
  onUpdateCanvas: (action: string, params: any) => void;
}
interface AgentTask {
  id: string;
  command: string;
  status: "pending" | "executing" | "completed" | "error";
  result?: string;
  timestamp: Date;
}
export const AIAgent = ({
  onExecuteCommand,
  onUpdateCanvas
}: AIAgentProps) => {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const parseCommand = (command: string) => {
    const cmd = command.toLowerCase();

    // 模型部署指令
    if (cmd.includes("部署") && cmd.includes("模型")) {
      const modelMatch = cmd.match(/部署\s*([^\s]+)\s*模型/);
      const modelName = modelMatch ? modelMatch[1] : "unknown";
      return {
        type: "deploy_model",
        params: {
          modelName
        },
        description: `部署 ${modelName} 模型`
      };
    }

    // 画布操作指令
    if (cmd.includes("添加") && (cmd.includes("组件") || cmd.includes("terminal") || cmd.includes("jupyter"))) {
      let componentType = "unknown";
      if (cmd.includes("terminal")) componentType = "terminal";
      if (cmd.includes("jupyter")) componentType = "jupyter";
      if (cmd.includes("vscode")) componentType = "vscode";
      if (cmd.includes("docker")) componentType = "docker";
      return {
        type: "add_component",
        params: {
          componentType
        },
        description: `添加 ${componentType} 组件到画布`
      };
    }

    // 布局调整指令
    if (cmd.includes("重新排列") || cmd.includes("整理") || cmd.includes("布局")) {
      return {
        type: "reorganize_layout",
        params: {},
        description: "重新整理画布布局"
      };
    }

    // 资源监控指令
    if (cmd.includes("监控") || cmd.includes("资源") || cmd.includes("状态")) {
      return {
        type: "check_resources",
        params: {},
        description: "检查系统资源状态"
      };
    }

    // 费用分析指令
    if (cmd.includes("费用") || cmd.includes("账单") || cmd.includes("成本")) {
      return {
        type: "analyze_billing",
        params: {},
        description: "分析费用和账单信息"
      };
    }
    return {
      type: "unknown",
      params: {},
      description: "未识别的指令"
    };
  };
  const executeAgentTask = async (command: string) => {
    const taskId = `task-${Date.now()}`;
    const parsedCommand = parseCommand(command);
    const newTask: AgentTask = {
      id: taskId,
      command: parsedCommand.description,
      status: "pending",
      timestamp: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
    setIsProcessing(true);

    // 模拟执行延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 更新任务状态为执行中
    setTasks(prev => prev.map(task => task.id === taskId ? {
      ...task,
      status: "executing" as const
    } : task));
    let result = "";
    try {
      switch (parsedCommand.type) {
        case "deploy_model":
          result = await simulateModelDeployment(parsedCommand.params.modelName);
          break;
        case "add_component":
          result = simulateAddComponent(parsedCommand.params.componentType);
          onUpdateCanvas("add", parsedCommand.params);
          break;
        case "reorganize_layout":
          result = "画布布局已重新整理，组件按照最优方式排列";
          onUpdateCanvas("reorganize", {});
          break;
        case "check_resources":
          result = "当前GPU使用率78%，内存使用率65%，建议优化资源配置";
          break;
        case "analyze_billing":
          result = "本月费用¥1,234，比上月增长12%，主要来自GPU使用费¥890";
          break;
        default:
          result = "抱歉，我还不能理解这个指令。请尝试说'部署模型'、'添加组件'或'检查资源'等。";
      }

      // 更新任务状态为完成
      setTasks(prev => prev.map(task => task.id === taskId ? {
        ...task,
        status: "completed" as const,
        result
      } : task));
    } catch (error) {
      setTasks(prev => prev.map(task => task.id === taskId ? {
        ...task,
        status: "error" as const,
        result: "执行失败: " + (error as Error).message
      } : task));
    }
    setIsProcessing(false);
  };
  const simulateModelDeployment = async (modelName: string): Promise<string> => {
    // 模拟部署过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `${modelName} 模型部署成功！API端点: https://api.${modelName.toLowerCase()}.your-domain.com`;
  };
  const simulateAddComponent = (componentType: string): string => {
    const componentNames: {
      [key: string]: string;
    } = {
      terminal: "Terminal终端",
      jupyter: "Jupyter Notebook",
      vscode: "VS Code编辑器",
      docker: "Docker容器"
    };
    const name = componentNames[componentType] || componentType;
    return `${name} 组件已添加到画布，您可以开始使用了`;
  };
  const getStatusBadge = (status: AgentTask["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">等待中</Badge>;
      case "executing":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">执行中</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">已完成</Badge>;
      case "error":
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">失败</Badge>;
    }
  };
  const predefinedCommands = ["部署 DeepSeek-R1 模型", "添加 Terminal 组件", "检查系统资源状态", "分析本月费用情况", "重新整理画布布局"];

  const handleSubmitCommand = async () => {
    if (!currentCommand.trim() || isProcessing) return;
    
    await executeAgentTask(currentCommand);
    setCurrentCommand("");
  };

  const handleQuickCommand = async (command: string) => {
    await executeAgentTask(command);
  };

  return (
    <>
      {/* Floating AI Icon */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 hover:from-purple-500 hover:via-pink-400 hover:to-blue-500 shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 z-50 group animate-pulse hover:animate-none border-2 border-white/30 hover:border-white/50"
      >
        <div className="relative">
          <Sparkles className="h-12 w-12 text-white group-hover:scale-125 transition-transform duration-300 drop-shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full group-hover:from-white/40 transition-all duration-300" />
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-300" />
        </div>
      </Button>

      {/* AI Chat Panel */}
      {isOpen && (
        <div className="fixed top-4 right-4 w-96 h-[600px] bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 z-40 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Alaya AI助手</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Commands */}
          <div className="p-4 border-b border-border/30">
            <div className="text-sm text-muted-foreground mb-2">快速指令:</div>
            <div className="grid grid-cols-1 gap-1">
              {predefinedCommands.map((cmd, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-xs h-8 hover:bg-primary/10"
                  onClick={() => handleQuickCommand(cmd)}
                  disabled={isProcessing}
                >
                  {cmd}
                </Button>
              ))}
            </div>
          </div>

          {/* Task History */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card key={task.id} className="p-3 bg-muted/30 border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium">{task.command}</span>
                    {getStatusBadge(task.status)}
                  </div>
                  {task.result && (
                    <p className="text-xs text-muted-foreground">{task.result}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {task.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                placeholder="输入指令..."
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitCommand()}
                disabled={isProcessing}
                className="text-sm bg-muted/50"
              />
              <Button 
                size="icon" 
                onClick={handleSubmitCommand}
                disabled={isProcessing || !currentCommand.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
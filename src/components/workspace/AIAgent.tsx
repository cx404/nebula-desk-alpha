import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export const AIAgent = ({ onExecuteCommand, onUpdateCanvas }: AIAgentProps) => {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseCommand = (command: string) => {
    const cmd = command.toLowerCase();
    
    // 模型部署指令
    if (cmd.includes("部署") && cmd.includes("模型")) {
      const modelMatch = cmd.match(/部署\s*([^\s]+)\s*模型/);
      const modelName = modelMatch ? modelMatch[1] : "unknown";
      return {
        type: "deploy_model",
        params: { modelName },
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
        params: { componentType },
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
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: "executing" as const } : task
    ));
    
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
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: "completed" as const, result } : task
      ));
      
    } catch (error) {
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { 
          ...task, 
          status: "error" as const, 
          result: "执行失败: " + (error as Error).message 
        } : task
      ));
    }
    
    setIsProcessing(false);
  };

  const simulateModelDeployment = async (modelName: string): Promise<string> => {
    // 模拟部署过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `${modelName} 模型部署成功！API端点: https://api.${modelName.toLowerCase()}.your-domain.com`;
  };

  const simulateAddComponent = (componentType: string): string => {
    const componentNames: { [key: string]: string } = {
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

  const predefinedCommands = [
    "部署 DeepSeek-R1 模型",
    "添加 Terminal 组件",
    "检查系统资源状态",
    "分析本月费用情况",
    "重新整理画布布局"
  ];

  return (
    <Card className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Agent</h3>
          <p className="text-xs text-gray-400">自动执行工作空间任务</p>
        </div>
      </div>

      {/* 快速指令 */}
      <div className="mb-4">
        <h4 className="text-xs text-gray-400 mb-2">快速指令:</h4>
        <div className="flex flex-wrap gap-1">
          {predefinedCommands.map((cmd, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10"
              onClick={() => executeAgentTask(cmd)}
              disabled={isProcessing}
            >
              {cmd}
            </Button>
          ))}
        </div>
      </div>

      {/* 任务历史 */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        <h4 className="text-xs text-gray-400">执行历史:</h4>
        {tasks.length === 0 ? (
          <div className="text-xs text-gray-500 text-center py-4">
            暂无执行记录
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="p-2 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-white font-medium truncate">{task.command}</span>
                {getStatusBadge(task.status)}
              </div>
              {task.result && (
                <p className="text-xs text-gray-400 mt-1">{task.result}</p>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {task.timestamp.toLocaleTimeString('zh-CN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
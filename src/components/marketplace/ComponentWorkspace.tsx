import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkspaceCanvas } from "../workspace/WorkspaceCanvas";
import { AIAgent } from "../workspace/AIAgent";
import { toast } from "sonner";
import { Terminal, FileText, Rocket, Settings, Play, FolderOpen } from "lucide-react";
interface WorkspaceComponent {
  id: string;
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  type: "terminal" | "jupyter" | "model-deploy" | "tensorboard" | "code-editor" | "custom";
  status: "idle" | "running" | "error";
  connections?: Array<{
    targetId: string;
    type: "data" | "control" | "error";
  }>;
}
interface ComponentFlow {
  id: string;
  name: string;
  components: WorkspaceComponent[];
  connections: Array<{
    sourceId: string;
    targetId: string;
    type: "data" | "control" | "error";
  }>;
}
const componentTemplates = {
  terminal: {
    name: "Terminal",
    icon: <Terminal className="w-6 h-6" />,
    type: "terminal" as const
  },
  jupyter: {
    name: "Jupyter Notebook",
    icon: <FileText className="w-6 h-6" />,
    type: "jupyter" as const
  },
  "model-deploy": {
    name: "模型部署",
    icon: <Rocket className="w-6 h-6" />,
    type: "model-deploy" as const
  },
  tensorboard: {
    name: "TensorBoard",
    icon: <Settings className="w-6 h-6" />,
    type: "tensorboard" as const
  },
  "code-editor": {
    name: "代码编辑器",
    icon: <FileText className="w-6 h-6" />,
    type: "code-editor" as const
  }
};
const predefinedFlows: ComponentFlow[] = [{
  id: "ml-pipeline",
  name: "机器学习流水线",
  components: [{
    id: "data-prep",
    name: "数据预处理",
    icon: <Settings className="w-6 h-6" />,
    x: 100,
    y: 100,
    type: "jupyter",
    status: "idle"
  }, {
    id: "training",
    name: "模型训练",
    icon: <FileText className="w-6 h-6" />,
    x: 300,
    y: 100,
    type: "jupyter",
    status: "idle"
  }, {
    id: "deploy",
    name: "模型部署",
    icon: <Rocket className="w-6 h-6" />,
    x: 500,
    y: 100,
    type: "model-deploy",
    status: "idle"
  }],
  connections: [{
    sourceId: "data-prep",
    targetId: "training",
    type: "data"
  }, {
    sourceId: "training",
    targetId: "deploy",
    type: "control"
  }]
}, {
  id: "dev-workflow",
  name: "开发工作流",
  components: [{
    id: "editor",
    name: "代码编辑",
    icon: <FileText className="w-6 h-6" />,
    x: 100,
    y: 100,
    type: "code-editor",
    status: "idle"
  }, {
    id: "terminal",
    name: "终端",
    icon: <Terminal className="w-6 h-6" />,
    x: 300,
    y: 100,
    type: "terminal",
    status: "idle"
  }, {
    id: "jupyter",
    name: "测试",
    icon: <FileText className="w-6 h-6" />,
    x: 500,
    y: 100,
    type: "jupyter",
    status: "idle"
  }],
  connections: [{
    sourceId: "editor",
    targetId: "terminal",
    type: "control"
  }, {
    sourceId: "terminal",
    targetId: "jupyter",
    type: "data"
  }]
}];
export const ComponentWorkspace = () => {
  const [components, setComponents] = useState<WorkspaceComponent[]>([]);
  const [connections, setConnections] = useState<Array<{
    sourceId: string;
    targetId: string;
    type: "data" | "control" | "error";
  }>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSource, setConnectionSource] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const handlePositionChange = (id: string, x: number, y: number) => {
    setComponents(prev => prev.map(comp => comp.id === id ? {
      ...comp,
      x,
      y
    } : comp));
  };
  const handleSelect = (id: string) => {
    if (isConnecting && connectionSource && connectionSource !== id) {
      // 创建连接
      const newConnection = {
        sourceId: connectionSource,
        targetId: id,
        type: "data" as const
      };
      setConnections(prev => [...prev, newConnection]);
      setIsConnecting(false);
      setConnectionSource(null);
      toast.success("组件连接成功");
    } else {
      setSelectedComponent(id);
    }
  };
  const addComponentToWorkspace = (templateKey: string) => {
    const template = componentTemplates[templateKey as keyof typeof componentTemplates];
    if (!template) return;
    const newComponent: WorkspaceComponent = {
      id: `${templateKey}-${Date.now()}`,
      name: template.name,
      icon: template.icon,
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 100,
      type: template.type,
      status: "idle"
    };
    setComponents(prev => [...prev, newComponent]);
    toast.success(`${template.name} 组件已添加到工作空间`);
  };
  const startConnection = () => {
    if (!selectedComponent) {
      toast.error("请先选择一个组件");
      return;
    }
    setIsConnecting(true);
    setConnectionSource(selectedComponent);
    toast.info("请点击目标组件完成连接");
  };
  const deleteSelectedComponent = () => {
    if (selectedComponent) {
      setComponents(prev => prev.filter(comp => comp.id !== selectedComponent));
      setConnections(prev => prev.filter(conn => conn.sourceId !== selectedComponent && conn.targetId !== selectedComponent));
      setSelectedComponent(null);
      toast.success("组件已删除");
    }
  };
  const runComponent = (componentId: string) => {
    setComponents(prev => prev.map(comp => comp.id === componentId ? {
      ...comp,
      status: "running"
    } : comp));

    // 模拟运行
    setTimeout(() => {
      setComponents(prev => prev.map(comp => comp.id === componentId ? {
        ...comp,
        status: "idle"
      } : comp));
      toast.success("组件执行完成");
    }, 3000);
  };
  const executeFlow = () => {
    if (components.length === 0) {
      toast.error("工作空间中没有组件");
      return;
    }
    toast.info("开始执行流程...");

    // 按连接顺序执行组件
    const sortedComponents = [...components];
    sortedComponents.forEach((comp, index) => {
      setTimeout(() => {
        runComponent(comp.id);
      }, index * 1000);
    });
  };
  const loadPredefinedFlow = (flow: ComponentFlow) => {
    setComponents(flow.components);
    setConnections(flow.connections);
    setSelectedComponent(null);
    toast.success(`已加载"${flow.name}"流程`);
  };
  const handleAIExecuteCommand = async (command: string): Promise<string> => {
    const cmd = command.toLowerCase();
    if (cmd.includes("添加") && cmd.includes("组件")) {
      if (cmd.includes("terminal")) {
        addComponentToWorkspace("terminal");
        return "Terminal组件已添加到工作空间";
      } else if (cmd.includes("jupyter")) {
        addComponentToWorkspace("jupyter");
        return "Jupyter组件已添加到工作空间";
      } else if (cmd.includes("部署")) {
        addComponentToWorkspace("model-deploy");
        return "模型部署组件已添加到工作空间";
      }
    }
    if (cmd.includes("执行") || cmd.includes("运行")) {
      executeFlow();
      return "已开始执行工作流程";
    }
    return "指令已接收，正在处理...";
  };
  const handleAIUpdateCanvas = (action: string, params: any) => {
    if (action === "add" && params.componentType) {
      addComponentToWorkspace(params.componentType);
    } else if (action === "execute") {
      executeFlow();
    }
  };
  const getStatusColor = (status: WorkspaceComponent["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };
  return <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">工作空间</h2>
        <p className="text-gray-400">iPad风格的应用工作空间，拖拽创建和管理您的工作流</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：快速操作和AI助手 */}
        <div className="lg:col-span-1 space-y-4">
          {/* 快速操作 */}
          <Card className="p-4 bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">快速操作</h3>
            <div className="space-y-2">
              <Button onClick={executeFlow} size="sm" disabled={components.length === 0} className="w-full justify-start bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                <Play className="w-4 h-4 mr-2" />
                执行全部流程
              </Button>
              
              {predefinedFlows.map(flow => (
                <Button 
                  key={flow.id} 
                  onClick={() => loadPredefinedFlow(flow)} 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  {flow.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* 流程统计 */}
          <Card className="p-4 bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">统计信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">组件总数</span>
                <Badge className="bg-blue-500/20 text-blue-300">{components.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">连接数</span>
                <Badge className="bg-green-500/20 text-green-300">{connections.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">运行中</span>
                <Badge className="bg-yellow-500/20 text-yellow-300">
                  {components.filter(c => c.status === "running").length}
                </Badge>
              </div>
            </div>
          </Card>

          {/* AI助手 */}
          <AIAgent onExecuteCommand={handleAIExecuteCommand} onUpdateCanvas={handleAIUpdateCanvas} />
        </div>

        {/* 右侧：iPad风格工作空间画布 */}
        <div className="lg:col-span-3">
          <WorkspaceCanvas />
        </div>
      </div>
    </div>;
};
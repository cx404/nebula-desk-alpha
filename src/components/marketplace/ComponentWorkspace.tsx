import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DraggableComponent } from "../workspace/DraggableComponent";
import { ConnectionLine } from "../workspace/ComponentConnection";
import { AIAgent } from "../workspace/AIAgent";
import { toast } from "sonner";
import { Terminal, FileText, Rocket, Settings } from "lucide-react";
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
interface ComponentWorkspaceProps {
  initialComponents?: WorkspaceComponent[];
}
export const ComponentWorkspace = ({
  initialComponents = []
}: ComponentWorkspaceProps) => {
  const [components, setComponents] = useState<WorkspaceComponent[]>(initialComponents);

  // 同步外部传入的组件
  useEffect(() => {
    if (initialComponents.length > 0) {
      setComponents(initialComponents);
    }
  }, [initialComponents]);
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
  return (
    <div className="h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Component Palette */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-4 w-64">
          <h3 className="font-semibold mb-3">组件库</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(componentTemplates).map(([key, template]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => addComponentToWorkspace(key)}
                className="flex items-center gap-2 h-auto p-2"
              >
                {template.icon}
                <span className="text-xs">{template.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">预定义流程</h4>
            {predefinedFlows.map((flow) => (
              <Button
                key={flow.id}
                variant="ghost"
                size="sm"
                onClick={() => loadPredefinedFlow(flow)}
                className="w-full justify-start text-xs"
              >
                {flow.name}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="p-2">
          <div className="flex gap-2">
            <Button
              variant={isConnecting ? "default" : "outline"}
              size="sm"
              onClick={startConnection}
              disabled={!selectedComponent}
            >
              连接
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={deleteSelectedComponent}
              disabled={!selectedComponent}
            >
              删除
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={executeFlow}
            >
              执行流程
            </Button>
          </div>
        </Card>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full h-full overflow-hidden"
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "20px 20px"
        }}
      >
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => {
            const sourceComponent = components.find(c => c.id === connection.sourceId);
            const targetComponent = components.find(c => c.id === connection.targetId);
            
            if (!sourceComponent || !targetComponent) return null;
            
            return (
              <ConnectionLine
                key={index}
                startX={sourceComponent.x + 100}
                startY={sourceComponent.y + 40}
                endX={targetComponent.x}
                endY={targetComponent.y + 40}
                type={connection.type}
              />
            );
          })}
        </svg>

        {/* Components */}
        {components.map((component) => (
          <div key={component.id} className="absolute" style={{ left: component.x, top: component.y }}>
            <Card className={`w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer ${
              selectedComponent === component.id ? 'border-blue-500 ring-2 ring-blue-500' : ''
            }`}>
              <div className="mb-2">{component.icon}</div>
              <h3 className="text-white text-sm font-medium text-center leading-tight mb-1">
                {component.name}
              </h3>
              <Badge className={`text-xs ${getStatusColor(component.status)}`}>
                {component.status}
              </Badge>
            </Card>
          </div>
        ))}
      </div>

      {/* AI Agent */}
      <div className="absolute bottom-4 left-4 w-64">
        <AIAgent
          onExecuteCommand={handleAIExecuteCommand}
          onUpdateCanvas={handleAIUpdateCanvas}
        />
      </div>
    </div>
  );
};
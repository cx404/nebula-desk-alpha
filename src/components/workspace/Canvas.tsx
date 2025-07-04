import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DraggableComponent } from "./DraggableComponent";
import { ConnectionLine } from "./ComponentConnection";
import { toast } from "sonner";

interface CanvasComponent {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  connections?: Array<{
    targetId: string;
    type: "data" | "control" | "error";
  }>;
}

interface SavedLayout {
  name: string;
  components: CanvasComponent[];
  connections: Array<{
    sourceId: string;
    targetId: string;
    type: "data" | "control" | "error";
  }>;
}

const initialComponents: CanvasComponent[] = [
  { id: "notebook", name: "Jupyter Notebook", icon: "📓", x: 100, y: 100 },
  { id: "vscode", name: "VS Code", icon: "💻", x: 250, y: 100 },
  { id: "terminal", name: "Terminal", icon: "⚡", x: 400, y: 100 },
  { id: "browser", name: "Browser", icon: "🌐", x: 100, y: 250 },
  { id: "docker", name: "Docker", icon: "🐳", x: 250, y: 250 },
  { id: "git", name: "Git Client", icon: "📋", x: 400, y: 250 },
];

const availableComponents = [
  { name: "Python IDE", icon: "🐍" },
  { name: "Database", icon: "🗄️" },
  { name: "API Client", icon: "🔌" },
  { name: "Monitor", icon: "📊" },
  { name: "TensorBoard", icon: "📈" },
  { name: "GPU Monitor", icon: "⚡" },
  { name: "Data Loader", icon: "📁" },
  { name: "Kubernetes", icon: "⚙️" },
  { name: "API Gateway", icon: "🚪" },
  { name: "Model Server", icon: "🤖" },
];

export const Canvas = () => {
  const [components, setComponents] = useState<CanvasComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [connections, setConnections] = useState<Array<{
    sourceId: string;
    targetId: string;
    type: "data" | "control" | "error";
  }>>([]);
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSource, setConnectionSource] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handlePositionChange = (id: string, x: number, y: number) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id ? { ...comp, x, y } : comp
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedComponent(id);
  };

  const addComponent = (component: { name: string; icon: string }) => {
    const newComponent: CanvasComponent = {
      id: `component-${Date.now()}`,
      name: component.name,
      icon: component.icon,
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 100,
      connections: [],
    };
    setComponents(prev => [...prev, newComponent]);
    toast.success(`${component.name} 组件已添加`);
  };

  const deleteSelectedComponent = () => {
    if (selectedComponent) {
      setComponents(prev => prev.filter(comp => comp.id !== selectedComponent));
      // 删除相关连接
      setConnections(prev => prev.filter(
        conn => conn.sourceId !== selectedComponent && conn.targetId !== selectedComponent
      ));
      setSelectedComponent(null);
      toast.success("组件已删除");
    }
  };

  const saveCurrentLayout = () => {
    const layoutName = `布局_${new Date().toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
    
    const newLayout: SavedLayout = {
      name: layoutName,
      components: [...components],
      connections: [...connections],
    };
    
    setSavedLayouts(prev => [...prev, newLayout]);
    toast.success(`布局"${layoutName}"已保存`);
  };

  const loadLayout = (layout: SavedLayout) => {
    setComponents(layout.components);
    setConnections(layout.connections);
    setSelectedComponent(null);
    toast.success(`布局"${layout.name}"已加载`);
  };

  const autoArrangeComponents = () => {
    const gridSize = 140;
    const startX = 50;
    const startY = 50;
    const cols = 4;
    
    setComponents(prev => 
      prev.map((comp, index) => ({
        ...comp,
        x: startX + (index % cols) * gridSize,
        y: startY + Math.floor(index / cols) * gridSize,
      }))
    );
    toast.success("组件已自动排列");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">自定义工作空间</h2>
        <p className="text-gray-400">拖拽组件创建您的专属工作环境</p>
      </div>

      {/* 组件库和布局管理 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-3">组件库</h3>
          <div className="flex gap-2 flex-wrap">
            {availableComponents.map((comp, index) => (
              <Button
                key={index}
                onClick={() => addComponent(comp)}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
              >
                <span>{comp.icon}</span>
                {comp.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="ml-6">
          <h3 className="text-lg font-semibold text-white mb-3">布局管理</h3>
          <div className="flex gap-2">
            <Button
              onClick={autoArrangeComponents}
              size="sm"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
            >
              🔄 自动排列
            </Button>
            <Button
              onClick={saveCurrentLayout}
              size="sm"
              className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30"
            >
              💾 保存布局
            </Button>
          </div>
          {savedLayouts.length > 0 && (
            <div className="mt-2 space-y-1">
              {savedLayouts.slice(-3).map((layout, index) => (
                <Button
                  key={index}
                  onClick={() => loadLayout(layout)}
                  size="sm"
                  variant="outline"
                  className="w-full text-xs bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  📋 {layout.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 画布区域 */}
      <div className="relative h-[600px] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* 拖拽组件 */}
        <div 
          ref={canvasRef}
          className="relative h-full p-6"
        >
          {/* 连接线 */}
          {connections.map((connection, index) => {
            const sourceComp = components.find(c => c.id === connection.sourceId);
            const targetComp = components.find(c => c.id === connection.targetId);
            
            if (!sourceComp || !targetComp) return null;
            
            return (
              <ConnectionLine
                key={index}
                startX={sourceComp.x + 56} // 组件中心
                startY={sourceComp.y + 56}
                endX={targetComp.x + 56}
                endY={targetComp.y + 56}
                type={connection.type}
              />
            );
          })}
          
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              name={component.name}
              icon={component.icon}
              x={component.x}
              y={component.y}
              onPositionChange={handlePositionChange}
              onSelect={handleSelect}
              isSelected={selectedComponent === component.id}
            />
          ))}
        </div>

        {/* 工具栏 */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {selectedComponent && (
            <Button
              onClick={deleteSelectedComponent}
              size="sm"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
            >
              🗑️ 删除
            </Button>
          )}
          <Button 
            onClick={saveCurrentLayout}
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            💾 保存当前布局
          </Button>
        </div>
      </div>
    </div>
  );
};
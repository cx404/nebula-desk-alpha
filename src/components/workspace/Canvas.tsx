import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DraggableComponent } from "./DraggableComponent";

interface CanvasComponent {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
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
];

export const Canvas = () => {
  const [components, setComponents] = useState<CanvasComponent[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

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
    };
    setComponents(prev => [...prev, newComponent]);
  };

  const deleteSelectedComponent = () => {
    if (selectedComponent) {
      setComponents(prev => prev.filter(comp => comp.id !== selectedComponent));
      setSelectedComponent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">自定义工作空间</h2>
        <p className="text-gray-400">拖拽组件创建您的专属工作环境</p>
      </div>

      {/* 组件库 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-3">组件库</h3>
        <div className="flex gap-3 flex-wrap">
          {availableComponents.map((comp, index) => (
            <Button
              key={index}
              onClick={() => addComponent(comp)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
            >
              <span>{comp.icon}</span>
              {comp.name}
            </Button>
          ))}
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
        <div className="relative h-full p-6">
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
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
            >
              🗑️ 删除
            </Button>
          )}
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            💾 保存布局
          </Button>
        </div>
      </div>
    </div>
  );
};
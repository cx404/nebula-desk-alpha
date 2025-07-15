import { useState } from "react";
import { 
  FolderOpen, 
  Activity, 
  ShoppingCart, 
  Package, 
  FileText, 
  RefreshCw, 
  ListTodo, 
  Stethoscope,
  Layers,
  Download
} from "lucide-react";

interface WorkspaceIcon {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface CustomGroup {
  id: string;
  name: string;
  components: WorkspaceIcon[];
  gridPosition: { row: number; col: number };
}

interface WorkspaceIconGridProps {
  onIconClick: (iconId: string) => void;
}

export const WorkspaceIconGrid = ({ onIconClick }: WorkspaceIconGridProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [customGroups, setCustomGroups] = useState<CustomGroup[]>([]);
  const [gridLayout, setGridLayout] = useState<(string | null)[][]>(
    Array(4).fill(null).map(() => Array(4).fill(null))
  );

  const icons: WorkspaceIcon[] = [
    { id: "workspace", name: "工作空间管理", icon: FolderOpen, color: "text-blue-400" },
    { id: "monitor", name: "资源监控", icon: Activity, color: "text-green-400" },
    { id: "billing", name: "订单", icon: ShoppingCart, color: "text-purple-400" },
    { id: "docs", name: "文档", icon: FileText, color: "text-orange-400" },
    { id: "marketplace", name: "组件市场", icon: Package, color: "text-pink-400" },
    { id: "filesync", name: "文件同步", icon: RefreshCw, color: "text-cyan-400" },
    { id: "jobqueue", name: "任务队列", icon: ListTodo, color: "text-yellow-400" },
    { id: "diagnostics", name: "诊断", icon: Stethoscope, color: "text-red-400" },
    { id: "import", name: "导入组件", icon: Download, color: "text-indigo-400" }
  ];

  const availableIcons = icons.filter(icon => 
    !customGroups.some(group => 
      group.components.some(comp => comp.id === icon.id)
    )
  );

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIcon = icons.find(icon => icon.id === draggedItem);
    const targetIcon = icons.find(icon => icon.id === targetId);

    if (draggedIcon && targetIcon) {
      const newGroup: CustomGroup = {
        id: `group-${Date.now()}`,
        name: `${draggedIcon.name} + ${targetIcon.name}`,
        components: [draggedIcon, targetIcon],
        gridPosition: { row: 0, col: 0 }
      };
      
      setCustomGroups(prev => [...prev, newGroup]);
    }
    
    setDraggedItem(null);
  };

  return (
    <div className="grid grid-cols-4 gap-8 p-8">
      {/* 渲染可用的单个图标 */}
      {availableIcons.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredIcon === item.id;
        const isDragging = draggedItem === item.id;
        
        return (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer group"
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
            onClick={() => onIconClick(item.id)}
            onMouseEnter={() => setHoveredIcon(item.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className={`
              bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 
              flex items-center justify-center transition-all duration-300
              hover:bg-white/20 hover:border-white/40 hover:shadow-2xl
              ${isHovered ? 'w-24 h-24 scale-110' : 'w-16 h-16'}
              ${isDragging ? 'opacity-50 scale-95' : ''}
            `}>
              <Icon className={`${item.color} transition-all duration-300 ${
                isHovered ? 'w-12 h-12' : 'w-8 h-8'
              }`} />
            </div>
            <span className={`
              mt-3 text-center text-white/80 transition-all duration-300 text-sm font-medium
              ${isHovered ? 'text-white scale-105' : ''}
            `}>
              {item.name}
            </span>
          </div>
        );
      })}

      {/* 渲染自定义组（2x2大小） */}
      {customGroups.map((group) => {
        const isHovered = hoveredIcon === group.id;
        
        return (
          <div
            key={group.id}
            className="col-span-2 row-span-2 flex flex-col items-center cursor-pointer group relative"
            onClick={() => onIconClick(group.id)}
            onMouseEnter={() => setHoveredIcon(group.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className={`
              bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl 
              rounded-3xl border border-white/30 w-full h-full
              flex items-center justify-center transition-all duration-500
              hover:from-purple-500/30 hover:to-pink-500/30 hover:border-white/50 hover:shadow-2xl
              ${isHovered ? 'scale-105' : ''}
            `}>
              <Layers className="text-purple-300 w-16 h-16" />
              
              {/* 悬停时显示内部组件 */}
              {isHovered && (
                <div className="absolute inset-4 bg-white/10 rounded-2xl border border-white/20 
                                flex items-center justify-center gap-4 backdrop-blur-sm
                                animate-fade-in">
                  {group.components.map((comp, index) => {
                    const CompIcon = comp.icon;
                    return (
                      <div key={comp.id} className="flex flex-col items-center">
                        <div className="bg-white/20 rounded-xl p-3 border border-white/30">
                          <CompIcon className={`${comp.color} w-6 h-6`} />
                        </div>
                        <span className="text-xs text-white/70 mt-1 text-center">
                          {comp.name.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <span className={`
              mt-3 text-center text-white/80 transition-all duration-300 text-sm font-medium
              ${isHovered ? 'text-white scale-105' : ''}
            `}>
              {group.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
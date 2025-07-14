import { useState } from "react";
import { 
  FolderOpen, 
  Activity, 
  ShoppingCart, 
  Package, 
  FileText, 
  RefreshCw, 
  ListTodo, 
  Stethoscope
} from "lucide-react";

interface WorkspaceIconGridProps {
  onIconClick: (iconId: string) => void;
}

export const WorkspaceIconGrid = ({ onIconClick }: WorkspaceIconGridProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const icons = [
    { id: "workspace", name: "工作空间管理", icon: FolderOpen, color: "text-blue-400" },
    { id: "monitor", name: "资源监控", icon: Activity, color: "text-green-400" },
    { id: "billing", name: "订单", icon: ShoppingCart, color: "text-purple-400" },
    { id: "docs", name: "文档", icon: FileText, color: "text-orange-400" },
    { id: "marketplace", name: "组件市场", icon: Package, color: "text-pink-400" },
    { id: "filesync", name: "文件同步", icon: RefreshCw, color: "text-cyan-400" },
    { id: "jobqueue", name: "任务队列", icon: ListTodo, color: "text-yellow-400" },
    { id: "diagnostics", name: "诊断", icon: Stethoscope, color: "text-red-400" }
  ];

  return (
    <div className="grid grid-cols-4 gap-8 p-8">
      {icons.map((item) => {
        const Icon = item.icon;
        const isHovered = hoveredIcon === item.id;
        
        return (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onIconClick(item.id)}
            onMouseEnter={() => setHoveredIcon(item.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className={`
              bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 
              flex items-center justify-center transition-all duration-300
              hover:bg-white/20 hover:border-white/40 hover:shadow-2xl
              ${isHovered ? 'w-24 h-24 scale-110' : 'w-16 h-16'}
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
    </div>
  );
};
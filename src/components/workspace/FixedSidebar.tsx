import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  Activity, 
  ShoppingCart, 
  Package, 
  FileText, 
  RefreshCw, 
  ListTodo, 
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Menu,
  Home
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface FixedSidebarProps {
  selectedNav: string;
  onNavSelect: (nav: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const FixedSidebar = ({ 
  selectedNav, 
  onNavSelect,
  isCollapsed,
  onToggleCollapse
}: FixedSidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems = [
    { id: "home", name: "返回主页", icon: Home },
    { id: "workspace", name: "工作空间管理", icon: FolderOpen },
    { id: "monitor", name: "资源监控", icon: Activity },
    { id: "billing", name: "订单", icon: ShoppingCart },
    { id: "docs", name: "文档", icon: FileText },
    { id: "marketplace", name: "组件市场", icon: Package },
    { id: "filesync", name: "文件同步", icon: RefreshCw },
    { id: "jobqueue", name: "任务队列", icon: ListTodo },
    { id: "diagnostics", name: "诊断", icon: Stethoscope }
  ];

  return (
    <TooltipProvider>
      <div className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Toggle Button */}
        <div className="flex justify-end p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="px-3 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedNav === item.id;
            
            return (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size={isCollapsed ? "sm" : "default"}
                    onClick={() => onNavSelect(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full ${isCollapsed ? 'px-2 justify-center' : 'justify-start'} transition-all duration-200 ${
                      isSelected 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    } ${
                      hoveredItem === item.id ? 'scale-105' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} transition-all duration-200`} />
                    {!isCollapsed && (
                      <span className="truncate text-sm font-medium">{item.name}</span>
                    )}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
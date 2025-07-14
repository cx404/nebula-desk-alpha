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
      <div className={`fixed left-0 top-0 h-full backdrop-blur-2xl border-r transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`} style={{
        background: 'linear-gradient(145deg, hsl(270 25% 15% / 0.2), hsl(270 20% 10% / 0.4))',
        borderColor: 'hsl(270 45% 65% / 0.15)',
        boxShadow: 'inset 0 1px 0 hsl(270 50% 80% / 0.1), 4px 0 20px hsl(270 20% 5% / 0.3)'
      }}>
        {/* Toggle Button */}
        <div className="flex justify-end p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="tech-icon text-white/80 hover:text-white w-10 h-10 p-0"
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
                    className={`w-full ${isCollapsed ? 'px-2 justify-center' : 'justify-start'} transition-all duration-300 ${
                      isSelected 
                        ? 'tech-icon text-white border-purple-400/30 bg-gradient-to-r from-purple-500/20 to-pink-500/10' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    } ${
                      hoveredItem === item.id ? 'scale-105 tech-icon' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} transition-all duration-300 ${
                      isSelected || hoveredItem === item.id ? 'text-purple-300' : ''
                    }`} />
                    {!isCollapsed && (
                      <span className="truncate text-sm font-medium">{item.name}</span>
                    )}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="glass-card text-white border-purple-400/20">
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
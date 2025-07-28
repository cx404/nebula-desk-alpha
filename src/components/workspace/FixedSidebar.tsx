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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/workspace");
  };

  const navigationItems = [
    { id: "billing", name: "订单", icon: ShoppingCart },
    { id: "docs", name: "文档说明", icon: FileText },
    { id: "marketplace", name: "组件市场", icon: Package },
    { id: "filesync", name: "文件", icon: RefreshCw },
    { id: "jobqueue", name: "任务队列", icon: ListTodo },
    { id: "diagnostics", name: "诊断", icon: Stethoscope }
  ];

  return (
    <TooltipProvider>
      <div className={`sidebar-glass fixed left-0 top-0 h-full transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header with Home and Toggle */}
        <div className="flex items-center justify-between p-3 border-b border-border/20">
          {/* Home Button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHomeClick}
                className="magic-icon text-foreground/80 hover:text-foreground hover:bg-primary/10"
              >
                {!isCollapsed && <span className="text-sm">LOGO</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="glass-card text-foreground border-border/30">
                返回首页
              </TooltipContent>
            )}
          </Tooltip>

          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="magic-icon text-foreground/80 hover:text-foreground hover:bg-primary/10"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* 首页按钮 */}
        <div className="px-3 py-2 border-b border-border/20">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "sm" : "default"}
                onClick={() => onNavSelect("home")}
                className={`magic-icon w-full ${isCollapsed ? 'px-2 justify-center' : 'justify-start'} transition-all duration-200 text-foreground/70 hover:text-foreground hover:bg-primary/10`}
              >
                <Home className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} transition-all duration-200`} />
                {!isCollapsed && (
                  <span className="truncate text-sm font-medium">工作空间</span>
                )}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="glass-card text-foreground border-border/30">
                工作空间
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-2 space-y-2">
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
                    className={`magic-icon w-full ${isCollapsed ? 'px-2 justify-center' : 'justify-start'} transition-all duration-200 ${
                      isSelected 
                        ? 'bg-primary/20 text-foreground border border-primary/30' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-primary/10'
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
                  <TooltipContent side="right" className="glass-card text-foreground border-border/30">
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
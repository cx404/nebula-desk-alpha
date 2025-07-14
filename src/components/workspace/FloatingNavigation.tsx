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
  Trash2,
  Plus,
  ArrowLeftRight,
  Save,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface FloatingNavigationProps {
  selectedNav: string;
  onNavSelect: (nav: string) => void;
  onNewWorkspace?: () => void;
  onSwitchWorkspace?: () => void;
  onSaveTemplate?: () => void;
  onDeleteTemplate?: () => void;
}

export const FloatingNavigation = ({ 
  selectedNav, 
  onNavSelect,
  onNewWorkspace,
  onSwitchWorkspace,
  onSaveTemplate,
  onDeleteTemplate
}: FloatingNavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const navigationItems = [
    {
      id: "home",
      name: "主页",
      icon: Home,
      action: handleHomeClick,
    },
    {
      id: "workspace-management",
      name: "工作空间管理",
      icon: FolderOpen,
      hasDropdown: true,
      items: [
        { id: "new-workspace", name: "新建工作空间", icon: Plus, action: onNewWorkspace },
        { id: "switch-workspace", name: "切换工作空间", icon: ArrowLeftRight, action: onSwitchWorkspace },
        { id: "save-template", name: "保存为模板", icon: Save, action: onSaveTemplate }
      ]
    },
    {
      id: "monitoring",
      name: "资源监控",
      icon: Activity,
    },
    {
      id: "orders",
      name: "订单",
      icon: ShoppingCart,
    },
    {
      id: "marketplace",
      name: "组件市场",
      icon: Package,
    },
    {
      id: "docs",
      name: "文档",
      icon: FileText,
    },
    {
      id: "file-sync",
      name: "文件同步",
      icon: RefreshCw,
    },
    {
      id: "task-queue",
      name: "任务队列",
      icon: ListTodo,
    },
    {
      id: "diagnostics",
      name: "诊断",
      icon: Stethoscope,
    },
    {
      id: "delete-template",
      name: "删除工作空间模板",
      icon: Trash2,
      action: onDeleteTemplate,
      variant: "destructive" as const
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onNavSelect(item.id);
    }
  };

  return (
    <TooltipProvider>
      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
        isCollapsed ? 'translate-x-0' : 'translate-x-0'
      }`}>
        {/* 折叠/展开按钮 */}
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 rounded-full bg-purple-500/20 backdrop-blur-xl border border-purple-300/30 text-purple-300 hover:bg-purple-500/30 hover:scale-110 transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </Button>
        </div>

        <div className={`
          flex transition-all duration-500 ease-in-out
          ${isCollapsed ? 'flex-col gap-3 p-4' : 'flex-row flex-wrap gap-4 p-6 w-96'}
          bg-purple-500/20 backdrop-blur-xl rounded-2xl border border-purple-300/30 shadow-lg shadow-purple-500/20
        `}>
          {navigationItems.map((item) => (
            <div key={item.id} className={`
              ${isCollapsed ? '' : 'flex flex-col items-center'}
            `}>
              {item.hasDropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`
                              ${isCollapsed ? 'w-12 h-12' : hoveredItem === item.id ? 'w-16 h-16' : 'w-12 h-12'}
                              rounded-xl transition-all duration-300 border-2
                              ${selectedNav === item.id 
                                ? 'bg-purple-400/30 border-purple-400/60 text-purple-200 scale-110' 
                                : 'bg-purple-500/10 border-purple-300/20 text-purple-200 hover:bg-purple-500/20 hover:border-purple-300/40 hover:scale-110'
                              }
                              hover:shadow-lg hover:shadow-purple-500/30
                            `}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <item.icon className={`${hoveredItem === item.id && !isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side={isCollapsed ? "right" : "top"} className="ml-2">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    side="right" 
                    className="ml-2 bg-purple-900/90 backdrop-blur-xl border border-purple-300/30"
                  >
                    {item.items?.map((subItem, index) => (
                      <div key={subItem.id}>
                        <DropdownMenuItem
                          onClick={() => handleItemClick(subItem)}
                          className="text-purple-200 hover:bg-purple-500/20 cursor-pointer flex items-center gap-2"
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.name}
                        </DropdownMenuItem>
                        {index < item.items!.length - 1 && <DropdownMenuSeparator className="bg-purple-300/20" />}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex flex-col items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleItemClick(item)}
                        className={`
                          ${isCollapsed ? 'w-12 h-12' : hoveredItem === item.id ? 'w-16 h-16' : 'w-12 h-12'}
                          rounded-xl transition-all duration-300 border-2
                          ${selectedNav === item.id 
                            ? 'bg-purple-400/30 border-purple-400/60 text-purple-200 scale-110' 
                            : item.variant === 'destructive'
                              ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:scale-110'
                              : 'bg-purple-500/10 border-purple-300/20 text-purple-200 hover:bg-purple-500/20 hover:border-purple-300/40 hover:scale-110'
                          }
                          hover:shadow-lg 
                          ${item.variant === 'destructive' ? 'hover:shadow-red-500/20' : 'hover:shadow-purple-500/30'}
                        `}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <item.icon className={`${hoveredItem === item.id && !isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side={isCollapsed ? "right" : "top"} className="ml-2">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                  {!isCollapsed && (
                    <span className="text-xs text-purple-200 mt-1 text-center leading-tight">
                      {item.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
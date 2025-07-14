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
  Save
} from "lucide-react";
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

  const navigationItems = [
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
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3 p-4 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
          {navigationItems.map((item) => (
            <div key={item.id}>
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
                              w-12 h-12 rounded-xl transition-all duration-300 border-2
                              ${selectedNav === item.id 
                                ? 'bg-primary/20 border-primary/50 text-primary scale-110' 
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:scale-105'
                              }
                              hover:shadow-lg hover:shadow-primary/20
                            `}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <item.icon className="w-5 h-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    side="right" 
                    className="ml-2 bg-black/90 backdrop-blur-xl border border-white/20"
                  >
                    {item.items?.map((subItem, index) => (
                      <div key={subItem.id}>
                        <DropdownMenuItem
                          onClick={() => handleItemClick(subItem)}
                          className="text-white hover:bg-white/10 cursor-pointer flex items-center gap-2"
                        >
                          <subItem.icon className="w-4 h-4" />
                          {subItem.name}
                        </DropdownMenuItem>
                        {index < item.items!.length - 1 && <DropdownMenuSeparator className="bg-white/10" />}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleItemClick(item)}
                      className={`
                        w-12 h-12 rounded-xl transition-all duration-300 border-2
                        ${selectedNav === item.id 
                          ? 'bg-primary/20 border-primary/50 text-primary scale-110' 
                          : item.variant === 'destructive'
                            ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:scale-105'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:scale-105'
                        }
                        hover:shadow-lg 
                        ${item.variant === 'destructive' ? 'hover:shadow-red-500/20' : 'hover:shadow-primary/20'}
                      `}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <item.icon className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
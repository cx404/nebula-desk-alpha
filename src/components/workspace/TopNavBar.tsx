import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Check, X, Edit3, Activity, FolderOpen, User, Settings, CreditCard, ArrowDownToLine, LogOut, Sparkles, Menu } from "lucide-react";

interface TopNavBarProps {
  // Workspace props
  currentWorkspace?: any;
  isEditingName: boolean;
  editingName: string;
  selectedNav: string;
  showAINavigator: boolean;
  useFixedSidebar: boolean;
  // Handlers
  onEditingNameChange: (value: string) => void;
  onSaveWorkspaceName: () => void;
  onCancelEditName: () => void;
  onStartEditingName: () => void;
  onNavSelect: (nav: string) => void;
  onToggleAINavigator: () => void;
  onToggleSidebarMode: () => void;
}

export const TopNavBar = ({ 
  currentWorkspace,
  isEditingName,
  editingName,
  selectedNav,
  showAINavigator,
  useFixedSidebar,
  onEditingNameChange,
  onSaveWorkspaceName,
  onCancelEditName,
  onStartEditingName,
  onNavSelect,
  onToggleAINavigator,
  onToggleSidebarMode
}: TopNavBarProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border/20 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Logo */}
        <Button
          variant="ghost"
          onClick={handleLogoClick}
          className="text-xl font-bold text-foreground hover:text-primary hover:bg-primary/10 transition-all"
        >
          LOGO
        </Button>

        {/* Center - Workspace Name */}
        <div className="flex items-center gap-4">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input 
                value={editingName} 
                onChange={e => onEditingNameChange(e.target.value)} 
                className="bg-white/10 border-white/20 text-white text-xl font-bold px-3 py-1 h-auto" 
                autoFocus 
                onKeyPress={e => e.key === 'Enter' && onSaveWorkspaceName()} 
              />
              <Button onClick={onSaveWorkspaceName} size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                <Check className="h-4 w-4" />
              </Button>
              <Button onClick={onCancelEditName} size="sm" variant="outline" className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">
                {currentWorkspace?.name || "工作空间"}
              </h1>
              <Button onClick={onStartEditingName} size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* 资源监控按钮 */}
          <Button 
            onClick={() => onNavSelect("monitor")} 
            variant="outline" 
            size="sm" 
            className={`${selectedNav === "monitor" ? "bg-primary/20 border-primary/30 text-primary" : "bg-gray-500/10 border-gray-500/30 text-gray-300 hover:bg-gray-500/20"}`}
          >
            <Activity className="h-4 w-4 mr-2" />
            资源监控
          </Button>
          
          {/* 工作空间管理按钮 */}
          <Button 
            onClick={() => onNavSelect("workspace")} 
            variant="outline" 
            size="sm" 
            className={`${selectedNav === "workspace" ? "bg-primary/20 border-primary/30 text-primary" : "bg-gray-500/10 border-gray-500/30 text-gray-300 hover:bg-gray-500/20"}`}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            工作空间管理
          </Button>

          {/* 用户图标下拉菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <User className="w-4 h-4 text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                设置
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                账户信息
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="w-4 h-4 mr-2" />
                费用
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                下载客户端
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* AI导航栏切换按钮 */}
          <Button 
            onClick={onToggleAINavigator} 
            variant="outline" 
            size="sm" 
            className="bg-pink-500/10 border-pink-500/30 text-pink-300 hover:bg-pink-500/20"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {showAINavigator ? '隐藏AI' : '显示AI'}
          </Button>
          
          {/* 导航模式切换按钮 */}
          <Button 
            onClick={onToggleSidebarMode} 
            variant="outline" 
            size="sm" 
            className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
          >
            <Menu className="h-4 w-4 mr-2" />
            {useFixedSidebar ? '悬浮模式' : '固定模式'}
          </Button>
        </div>
      </div>
    </div>
  );
};
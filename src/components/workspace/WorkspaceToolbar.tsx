import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, FolderOpen, Save, Settings, ChevronDown } from "lucide-react";

export const WorkspaceToolbar = () => {
  const { 
    workspaces, 
    currentWorkspace, 
    switchWorkspace, 
    saveWorkspaceAsTemplate 
  } = useWorkspace();
  const navigate = useNavigate();
  
  const [isNewWorkspaceDialogOpen, setIsNewWorkspaceDialogOpen] = useState(false);
  const [isSaveTemplateDialogOpen, setIsSaveTemplateDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const handleNewWorkspace = () => {
    navigate("/projects");
  };

  const handleSwitchWorkspace = (workspaceId: string) => {
    switchWorkspace(workspaceId);
    toast.success("工作空间已切换");
    // 重新加载页面以应用新的工作空间布局
    window.location.reload();
  };

  const handleSaveTemplate = () => {
    if (!currentWorkspace) return;
    
    if (!templateName.trim()) {
      toast.error("请输入模板名称");
      return;
    }

    const templateWorkspace = {
      ...currentWorkspace,
      name: templateName,
      description: templateDescription,
    };
    
    saveWorkspaceAsTemplate(templateWorkspace);
    setIsSaveTemplateDialogOpen(false);
    setTemplateName("");
    setTemplateDescription("");
    toast.success("工作空间已保存为模板");
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-card/50 backdrop-blur-lg border-b border-border/50">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>当前工作空间：</span>
        <span className="font-medium text-foreground">
          {currentWorkspace?.name || "未选择"}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* 新建工作空间 */}
        <Button
          onClick={handleNewWorkspace}
          size="sm"
          className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
        >
          <Plus className="w-4 h-4 mr-1" />
          新建工作空间
        </Button>

        {/* 切换工作空间 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={workspaces.length === 0}
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
            >
              <FolderOpen className="w-4 h-4 mr-1" />
              切换工作空间
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-lg border border-border/50">
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => handleSwitchWorkspace(workspace.id)}
                className={`cursor-pointer ${
                  currentWorkspace?.id === workspace.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{workspace.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {workspace.description}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            {workspaces.length === 0 && (
              <DropdownMenuItem disabled>
                暂无其他工作空间
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 保存为模板 */}
        <Dialog 
          open={isSaveTemplateDialogOpen} 
          onOpenChange={setIsSaveTemplateDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={!currentWorkspace}
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
            >
              <Save className="w-4 h-4 mr-1" />
              保存为模板
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-lg border-border/50">
            <DialogHeader>
              <DialogTitle>保存工作空间为模板</DialogTitle>
              <DialogDescription>
                将当前工作空间配置保存为模板，方便以后快速创建相似的工作空间
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="template-name" className="text-sm font-medium">
                  模板名称
                </label>
                <Input
                  id="template-name"
                  placeholder="输入模板名称"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="template-description" className="text-sm font-medium">
                  模板描述
                </label>
                <Textarea
                  id="template-description"
                  placeholder="描述模板的用途和特点"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                保存模板
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
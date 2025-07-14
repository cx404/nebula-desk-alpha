import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useWorkspaceMode } from "@/hooks/useWorkspaceMode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, FolderOpen, Save, Settings, ChevronDown, Edit, Eye } from "lucide-react";
export const WorkspaceToolbar = () => {
  const {
    workspaces,
    currentWorkspace,
    switchWorkspace,
    saveWorkspaceAsTemplate
  } = useWorkspace();
  const {
    mode,
    setMode,
    isEditMode
  } = useWorkspaceMode();
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
      description: templateDescription
    };
    saveWorkspaceAsTemplate(templateWorkspace);
    setIsSaveTemplateDialogOpen(false);
    setTemplateName("");
    setTemplateDescription("");
    toast.success("工作空间已保存为模板");
  };
  return (
    <div className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-sm border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FolderOpen className="h-4 w-4 mr-2" />
            {currentWorkspace?.name || "选择工作空间"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {workspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              onClick={() => handleSwitchWorkspace(workspace.id)}
            >
              {workspace.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleNewWorkspace}>
            <Plus className="h-4 w-4 mr-2" />
            新建工作空间
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" onClick={() => setIsSaveTemplateDialogOpen(true)}>
        <Save className="h-4 w-4 mr-2" />
        保存为模板
      </Button>

      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("edit")}
        >
          <Edit className="h-4 w-4 mr-2" />
          编辑模式
        </Button>
        <Button
          variant={!isEditMode ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("view")}
        >
          <Eye className="h-4 w-4 mr-2" />
          预览模式
        </Button>
      </div>

      <Dialog open={isSaveTemplateDialogOpen} onOpenChange={setIsSaveTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存为模板</DialogTitle>
            <DialogDescription>
              将当前工作空间保存为模板，以便后续快速创建相似的工作空间。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="模板名称"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Textarea
              placeholder="模板描述（可选）"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveTemplateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveTemplate}>保存模板</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
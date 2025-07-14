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
  return;
};
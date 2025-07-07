import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AppIcon } from "./AppIcon";
import { toast } from "sonner";
import { 
  Search, 
  Plus, 
  Grid3x3, 
  FolderOpen,
  Terminal,
  FileText,
  Rocket,
  Settings,
  Database,
  Globe,
  Cpu,
  Code,
  Image,
  Music
} from "lucide-react";

interface WorkspaceApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  status: "idle" | "running" | "error";
  category: string;
  description?: string;
  groupId?: string;
}

interface AppGroup {
  id: string;
  name: string;
  apps: string[];
  x: number;
  y: number;
}

const componentTemplates = [
  {
    id: "terminal",
    name: "Terminal",
    icon: <Terminal className="w-6 h-6" />,
    category: "开发工具",
    description: "命令行终端"
  },
  {
    id: "jupyter",
    name: "Jupyter",
    icon: <FileText className="w-6 h-6" />,
    category: "开发工具",
    description: "Python笔记本"
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: <Code className="w-6 h-6" />,
    category: "开发工具",
    description: "代码编辑器"
  },
  {
    id: "docker",
    name: "Docker",
    icon: <Cpu className="w-6 h-6" />,
    category: "容器",
    description: "容器管理"
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="w-6 h-6" />,
    category: "数据库",
    description: "数据库管理"
  },
  {
    id: "browser",
    name: "Browser",
    icon: <Globe className="w-6 h-6" />,
    category: "网络工具",
    description: "网页浏览器"
  },
  {
    id: "model-deploy",
    name: "模型部署",
    icon: <Rocket className="w-6 h-6" />,
    category: "AI工具",
    description: "AI模型部署"
  },
  {
    id: "tensorboard",
    name: "TensorBoard",
    icon: <Settings className="w-6 h-6" />,
    category: "AI工具",
    description: "模型可视化"
  },
  {
    id: "image-editor",
    name: "图像编辑",
    icon: <Image className="w-6 h-6" />,
    category: "媒体工具",
    description: "图像处理工具"
  },
  {
    id: "audio-editor",
    name: "音频编辑",
    icon: <Music className="w-6 h-6" />,
    category: "媒体工具",
    description: "音频处理工具"
  }
];

export const WorkspaceCanvas = () => {
  const [apps, setApps] = useState<WorkspaceApp[]>([
    {
      id: "app-1",
      name: "Jupyter",
      icon: <FileText className="w-6 h-6" />,
      x: 100,
      y: 100,
      status: "idle",
      category: "开发工具"
    },
    {
      id: "app-2", 
      name: "Terminal",
      icon: <Terminal className="w-6 h-6" />,
      x: 200,
      y: 100,
      status: "idle",
      category: "开发工具"
    },
    {
      id: "app-3",
      name: "Docker",
      icon: <Cpu className="w-6 h-6" />,
      x: 300,
      y: 100,
      status: "running",
      category: "容器"
    }
  ]);
  
  const [groups, setGroups] = useState<AppGroup[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showNewAppDialog, setShowNewAppDialog] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAppMove = (id: string, x: number, y: number) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, x, y } : app
    ));
  };

  const handleAppSelect = (id: string) => {
    setSelectedApps(prev => {
      if (prev.includes(id)) {
        return prev.filter(appId => appId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAppDelete = (id: string) => {
    setApps(prev => prev.filter(app => app.id !== id));
    setSelectedApps(prev => prev.filter(appId => appId !== id));
    toast.success("应用已删除");
  };

  const handleAppRun = (id: string) => {
    setApps(prev => prev.map(app => 
      app.id === id 
        ? { ...app, status: app.status === "running" ? "idle" : "running" }
        : app
    ));
    
    const app = apps.find(a => a.id === id);
    if (app) {
      toast.success(`${app.name} ${app.status === "running" ? "已停止" : "已启动"}`);
    }
  };

  const addAppFromTemplate = (template: typeof componentTemplates[0]) => {
    const newApp: WorkspaceApp = {
      id: `app-${Date.now()}`,
      name: template.name,
      icon: template.icon,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      status: "idle",
      category: template.category,
      description: template.description
    };
    
    setApps(prev => [...prev, newApp]);
    setShowMarketplace(false);
    toast.success(`${template.name} 已添加到工作空间`);
  };

  const createAppGroup = () => {
    if (selectedApps.length < 2) {
      toast.error("请选择至少两个应用来创建分组");
      return;
    }

    const groupId = `group-${Date.now()}`;
    const selectedAppObjects = apps.filter(app => selectedApps.includes(app.id));
    
    // 计算分组的中心位置
    const avgX = selectedAppObjects.reduce((sum, app) => sum + app.x, 0) / selectedAppObjects.length;
    const avgY = selectedAppObjects.reduce((sum, app) => sum + app.y, 0) / selectedAppObjects.length;

    const newGroup: AppGroup = {
      id: groupId,
      name: `应用组 ${groups.length + 1}`,
      apps: selectedApps,
      x: avgX,
      y: avgY
    };

    setGroups(prev => [...prev, newGroup]);
    
    // 更新应用的分组信息
    setApps(prev => prev.map(app => 
      selectedApps.includes(app.id) 
        ? { ...app, groupId }
        : app
    ));
    
    setSelectedApps([]);
    toast.success("应用分组已创建");
  };

  const createCustomApp = () => {
    if (!newAppName.trim()) {
      toast.error("请输入应用名称");
      return;
    }

    const newApp: WorkspaceApp = {
      id: `custom-${Date.now()}`,
      name: newAppName,
      icon: <Settings className="w-6 h-6" />,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      status: "idle",
      category: "自定义",
      description: "用户自定义应用"
    };

    setApps(prev => [...prev, newApp]);
    setNewAppName("");
    setShowNewAppDialog(false);
    toast.success("自定义应用已创建");
  };

  const filteredTemplates = componentTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(componentTemplates.map(t => t.category))];

  return (
    <div className="space-y-4">
      {/* 工具栏 */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          <Dialog open={showMarketplace} onOpenChange={setShowMarketplace}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30">
                <Plus className="w-4 h-4 mr-1" />
                添加应用
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-black/90 backdrop-blur-xl border border-white/20 text-white">
              <DialogHeader>
                <DialogTitle>应用市场</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="搜索应用..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20"
                  />
                  <Button onClick={() => setSearchTerm("")} variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                  {filteredTemplates.map(template => (
                    <Card 
                      key={template.id}
                      className="p-4 bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                      onClick={() => addAppFromTemplate(template)}
                    >
                      <div className="text-center">
                        <div className="mb-2">{template.icon}</div>
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                        <Badge className="mt-2 text-xs bg-blue-500/20 text-blue-300">
                          {template.category}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewAppDialog} onOpenChange={setShowNewAppDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                <Plus className="w-4 h-4 mr-1" />
                自定义应用
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 backdrop-blur-xl border border-white/20 text-white">
              <DialogHeader>
                <DialogTitle>创建自定义应用</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <Input
                  placeholder="应用名称"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  className="bg-white/10 border-white/20"
                />
                <div className="flex gap-2">
                  <Button onClick={createCustomApp} className="bg-green-500/20 hover:bg-green-500/30 text-green-300">
                    创建
                  </Button>
                  <Button onClick={() => setShowNewAppDialog(false)} variant="outline">
                    取消
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            size="sm" 
            onClick={createAppGroup}
            disabled={selectedApps.length < 2}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30"
          >
            <FolderOpen className="w-4 h-4 mr-1" />
            创建分组 ({selectedApps.length})
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-400">应用总数: {apps.length}</span>
          <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
            <Grid3x3 className="w-4 h-4 mr-1" />
            网格对齐
          </Button>
        </div>
      </div>

      {/* 画布区域 */}
      <Card className="relative h-[600px] bg-black/20 border border-white/10 overflow-hidden">
        {/* 网格背景 */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-10">
            <defs>
              <pattern id="workspace-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#workspace-grid)" />
          </svg>
        </div>

        {/* 画布内容 */}
        <div ref={canvasRef} className="relative h-full p-4">
          {/* 应用图标 */}
          {apps.map(app => (
            <AppIcon
              key={app.id}
              id={app.id}
              name={app.name}
              icon={app.icon}
              x={app.x}
              y={app.y}
              status={app.status}
              onMove={handleAppMove}
              onDelete={handleAppDelete}
              onRun={handleAppRun}
              onSelect={handleAppSelect}
              isSelected={selectedApps.includes(app.id)}
              isGrouped={!!app.groupId}
              groupId={app.groupId}
            />
          ))}

          {/* 空状态 */}
          {apps.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">📱</div>
                <h3 className="text-xl font-semibold text-white mb-2">工作空间为空</h3>
                <p className="text-gray-400 mb-4">添加应用开始构建您的工作环境</p>
                <Button onClick={() => setShowMarketplace(true)} className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300">
                  <Plus className="w-4 h-4 mr-2" />
                  添加第一个应用
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 分组列表 */}
      {groups.length > 0 && (
        <Card className="p-4 bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">应用分组</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {groups.map(group => (
              <div key={group.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-medium text-white">{group.name}</h4>
                <p className="text-sm text-gray-400">{group.apps.length} 个应用</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
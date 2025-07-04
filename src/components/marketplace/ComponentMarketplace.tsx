import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Terminal, FileText, Settings, Rocket } from "lucide-react";

interface Component {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  type: "official" | "community" | "custom";
  features: string[];
  downloads: number;
  rating: number;
  tags: string[];
  isInstalled: boolean;
}

const officialComponents: Component[] = [
  {
    id: "terminal",
    name: "Terminal",
    description: "全功能终端，支持命令行操作和脚本执行",
    icon: <Terminal className="w-6 h-6" />,
    category: "开发工具",
    type: "official",
    features: ["命令行界面", "脚本执行", "多窗口支持", "历史记录"],
    downloads: 15420,
    rating: 4.8,
    tags: ["终端", "命令行", "开发"],
    isInstalled: false
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    description: "交互式开发环境，支持文件上传和代码运行",
    icon: <FileText className="w-6 h-6" />,
    category: "开发工具",
    type: "official",
    features: ["文件上传", "代码执行", "可视化", "Markdown支持"],
    downloads: 12340,
    rating: 4.9,
    tags: ["notebook", "python", "数据科学"],
    isInstalled: true
  },
  {
    id: "model-deploy",
    name: "模型部署工具",
    description: "简化版模型部署工具，支持基础模型部署",
    icon: <Rocket className="w-6 h-6" />,
    category: "AI工具",
    type: "official",
    features: ["一键部署", "GPU配置", "API生成", "监控面板"],
    downloads: 8920,
    rating: 4.7,
    tags: ["模型", "部署", "AI"],
    isInstalled: false
  }
];

const communityComponents: Component[] = [
  {
    id: "tensorboard",
    name: "TensorBoard",
    description: "训练可视化工具",
    icon: <Settings className="w-6 h-6" />,
    category: "AI工具",
    type: "community",
    features: ["训练监控", "指标可视化", "模型图表"],
    downloads: 5670,
    rating: 4.5,
    tags: ["可视化", "训练", "监控"],
    isInstalled: false
  },
  {
    id: "code-editor",
    name: "代码编辑器",
    description: "在线代码编辑器，支持多语言",
    icon: <FileText className="w-6 h-6" />,
    category: "开发工具",
    type: "community",
    features: ["语法高亮", "代码补全", "多语言支持"],
    downloads: 7830,
    rating: 4.6,
    tags: ["编辑器", "代码", "开发"],
    isInstalled: false
  }
];

export const ComponentMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAIGenerateDialogOpen, setIsAIGenerateDialogOpen] = useState(false);
  const [newComponent, setNewComponent] = useState({
    name: "",
    description: "",
    category: "",
    features: ""
  });
  const [aiPrompt, setAiPrompt] = useState("");
  const [components, setComponents] = useState<Component[]>([
    ...officialComponents,
    ...communityComponents
  ]);

  const categories = ["all", "开发工具", "AI工具", "数据处理", "可视化"];

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallComponent = (componentId: string) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId ? { ...comp, isInstalled: true } : comp
    ));
    const component = components.find(c => c.id === componentId);
    toast.success(`${component?.name} 安装成功！`);
  };

  const handleUninstallComponent = (componentId: string) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId ? { ...comp, isInstalled: false } : comp
    ));
    const component = components.find(c => c.id === componentId);
    toast.success(`${component?.name} 已卸载`);
  };

  const handleCreateComponent = () => {
    if (!newComponent.name || !newComponent.description) {
      toast.error("请填写组件名称和描述");
      return;
    }

    const component: Component = {
      id: `custom-${Date.now()}`,
      name: newComponent.name,
      description: newComponent.description,
      icon: <Settings className="w-6 h-6" />,
      category: newComponent.category || "开发工具",
      type: "custom",
      features: newComponent.features.split(",").map(f => f.trim()).filter(f => f),
      downloads: 0,
      rating: 0,
      tags: ["自定义"],
      isInstalled: false
    };

    setComponents(prev => [...prev, component]);
    setNewComponent({ name: "", description: "", category: "", features: "" });
    setIsCreateDialogOpen(false);
    toast.success("组件创建成功！");
  };

  const handleAIGenerate = () => {
    if (!aiPrompt.trim()) {
      toast.error("请输入AI生成提示");
      return;
    }

    // 模拟AI生成组件
    const aiComponent: Component = {
      id: `ai-${Date.now()}`,
      name: `AI生成组件`,
      description: `基于提示"${aiPrompt}"生成的智能组件`,
      icon: <Rocket className="w-6 h-6" />,
      category: "AI工具",
      type: "custom",
      features: ["AI生成", "智能功能", "自动化"],
      downloads: 0,
      rating: 0,
      tags: ["AI", "自动生成"],
      isInstalled: false
    };

    setComponents(prev => [...prev, aiComponent]);
    setAiPrompt("");
    setIsAIGenerateDialogOpen(false);
    toast.success("AI组件生成成功！");
  };

  const renderComponentCard = (component: Component) => (
    <Card key={component.id} className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          {component.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-white truncate">{component.name}</h3>
            <Badge className={`text-xs ${
              component.type === "official" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
              component.type === "community" ? "bg-green-500/10 text-green-400 border-green-500/20" :
              "bg-purple-500/10 text-purple-400 border-purple-500/20"
            }`}>
              {component.type === "official" ? "官方" : 
               component.type === "community" ? "社区" : "自定义"}
            </Badge>
          </div>
          <p className="text-sm text-gray-400 mb-2 line-clamp-2">{component.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span>⭐ {component.rating || "N/A"}</span>
            <span>📥 {component.downloads.toLocaleString()}</span>
            <span>🏷️ {component.category}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {component.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {component.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {component.isInstalled ? (
          <>
            <Button 
              size="sm" 
              className="flex-1 bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
              disabled
            >
              ✓ 已安装
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              onClick={() => handleUninstallComponent(component.id)}
            >
              卸载
            </Button>
          </>
        ) : (
          <Button 
            size="sm" 
            className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
            onClick={() => handleInstallComponent(component.id)}
          >
            安装
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">组件市场</h2>
          <p className="text-gray-400">发现、安装和管理开发组件</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAIGenerateDialogOpen} onOpenChange={setIsAIGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                🤖 AI生成组件
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/90 backdrop-blur-xl border border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">AI生成组件</DialogTitle>
                <DialogDescription className="text-gray-400">
                  描述您需要的组件功能，AI将为您生成相应的组件
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="例如：创建一个数据可视化组件，支持图表展示和数据导出..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  rows={4}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAIGenerateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAIGenerate} className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                  生成组件
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                ➕ 新建组件
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/90 backdrop-blur-xl border border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">创建自定义组件</DialogTitle>
                <DialogDescription className="text-gray-400">
                  填写组件信息来创建您的自定义组件
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="组件名称"
                  value={newComponent.name}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Textarea
                  placeholder="组件描述"
                  value={newComponent.description}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Select value={newComponent.category} onValueChange={(value) => setNewComponent(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "all").map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="功能特性（用逗号分隔）"
                  value={newComponent.features}
                  onChange={(e) => setNewComponent(prev => ({ ...prev, features: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateComponent} className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                  创建组件
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex gap-4">
        <Input
          placeholder="搜索组件..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-white/5 border-white/10 text-white"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "全部分类" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500/20 text-white">全部</TabsTrigger>
          <TabsTrigger value="official" className="data-[state=active]:bg-blue-500/20 text-white">官方组件</TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-blue-500/20 text-white">社区组件</TabsTrigger>
          <TabsTrigger value="installed" className="data-[state=active]:bg-blue-500/20 text-white">已安装</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map(renderComponentCard)}
          </div>
        </TabsContent>

        <TabsContent value="official" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.filter(c => c.type === "official").map(renderComponentCard)}
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.filter(c => c.type === "community" || c.type === "custom").map(renderComponentCard)}
          </div>
        </TabsContent>

        <TabsContent value="installed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.filter(c => c.isInstalled).map(renderComponentCard)}
          </div>
        </TabsContent>
      </Tabs>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">没有找到匹配的组件</p>
        </div>
      )}
    </div>
  );
};
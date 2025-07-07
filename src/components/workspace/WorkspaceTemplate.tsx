import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Star, Zap, Code, Database, Brain, Globe } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  downloads: number;
  rating: number;
  tags: string[];
  preview: string;
  components: string[];
}

const templates: Template[] = [
  {
    id: "ai-dev",
    name: "AI开发工作空间",
    description: "专为AI模型开发设计的完整工作空间，包含Jupyter、GPU监控、模型部署工具",
    icon: "🤖",
    category: "AI/ML",
    downloads: 2341,
    rating: 4.8,
    tags: ["AI", "机器学习", "深度学习"],
    preview: "预览包含GPU监控、模型训练、数据处理组件",
    components: ["Jupyter Notebook", "GPU Monitor", "Model Trainer", "Data Processor"]
  },
  {
    id: "full-stack",
    name: "全栈开发环境",
    description: "包含前后端开发所需的所有工具，VS Code、终端、数据库管理",
    icon: "💻",
    category: "开发",
    downloads: 1876,
    rating: 4.6,
    tags: ["全栈", "Web开发", "数据库"],
    preview: "预览包含VS Code、终端、数据库客户端、API测试工具",
    components: ["VS Code", "Terminal", "Database Client", "API Tester"]
  },
  {
    id: "data-science",
    name: "数据科学套件",
    description: "数据分析师专用工作空间，包含数据可视化、统计分析工具",
    icon: "📊",
    category: "数据科学",
    downloads: 1543,
    rating: 4.7,
    tags: ["数据分析", "可视化", "统计"],
    preview: "预览包含Jupyter、图表工具、数据库连接器",
    components: ["Jupyter Lab", "Chart Builder", "Data Connector", "Stats Panel"]
  },
  {
    id: "web-design",
    name: "Web设计工作台",
    description: "UI/UX设计师专用，包含设计工具、原型制作、协作功能",
    icon: "🎨",
    category: "设计",
    downloads: 987,
    rating: 4.5,
    tags: ["UI设计", "原型", "协作"],
    preview: "预览包含设计工具、原型制作器、色彩面板",
    components: ["Design Tool", "Prototype Builder", "Color Palette", "Asset Manager"]
  },
  {
    id: "blockchain",
    name: "区块链开发环境",
    description: "智能合约开发专用工作空间，包含Solidity IDE、测试网络",
    icon: "⛓️",
    category: "区块链",
    downloads: 654,
    rating: 4.4,
    tags: ["区块链", "智能合约", "Web3"],
    preview: "预览包含Solidity IDE、区块链浏览器、钱包连接",
    components: ["Solidity IDE", "Blockchain Explorer", "Wallet Connector", "Test Network"]
  },
  {
    id: "devops",
    name: "DevOps运维中心",
    description: "运维工程师专用，包含监控面板、部署工具、日志分析",
    icon: "⚙️",
    category: "运维",
    downloads: 1234,
    rating: 4.6,
    tags: ["DevOps", "监控", "自动化"],
    preview: "预览包含监控面板、CI/CD工具、日志查看器",
    components: ["Monitor Dashboard", "CI/CD Pipeline", "Log Viewer", "Deploy Tools"]
  }
];

export const WorkspaceTemplate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [downloading, setDownloading] = useState<string | null>(null);

  const categories = ["全部", "AI/ML", "开发", "数据科学", "设计", "区块链", "运维"];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "全部" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (templateId: string) => {
    setDownloading(templateId);
    // 模拟下载过程
    setTimeout(() => {
      setDownloading(null);
      // 这里可以添加下载成功的提示
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">工作空间模板</h2>
        <p className="text-gray-400">选择预设模板快速搭建专业工作环境</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="搜索模板..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 
                "bg-purple-500 hover:bg-purple-600 text-white" : 
                "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* 模板网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="glass-card p-6 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-xl">
                  {template.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {template.name}
                  </h3>
                  <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {template.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <Download className="h-3 w-3" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-gray-400 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                <p className="mb-1">包含组件:</p>
                <p>{template.components.join(" • ")}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                预览
              </Button>
              <Button
                size="sm"
                onClick={() => handleDownload(template.id)}
                disabled={downloading === template.id}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {downloading === template.id ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                    下载中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="h-3 w-3" />
                    下载
                  </div>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-400">未找到匹配的模板</p>
          <p className="text-gray-500 text-sm mt-1">尝试调整搜索条件或筛选分类</p>
        </div>
      )}
    </div>
  );
};
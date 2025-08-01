import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Activity, ShoppingCart, Package, FileText, RefreshCw, ListTodo, Stethoscope } from "lucide-react";
interface InstalledComponent {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}
interface HomePageProps {
  onNavigate?: (nav: string) => void;
  installedComponents?: InstalledComponent[];
}
export const HomePage = ({
  onNavigate,
  installedComponents = []
}: HomePageProps) => {
  const functionModules = [{
    id: "workspace",
    name: "工作空间管理",
    icon: FolderOpen,
    description: "管理和监控您的工作空间",
    gradient: "from-blue-500 to-cyan-500"
  }, {
    id: "monitor",
    name: "资源监控",
    icon: Activity,
    description: "实时监控系统资源使用情况",
    gradient: "from-green-500 to-emerald-500"
  }, {
    id: "billing",
    name: "订单",
    icon: ShoppingCart,
    description: "查看订单和计费信息",
    gradient: "from-purple-500 to-pink-500"
  }, {
    id: "docs",
    name: "文档说明",
    icon: FileText,
    description: "浏览项目文档和帮助信息",
    gradient: "from-orange-500 to-red-500"
  }, {
    id: "marketplace",
    name: "组件市场",
    icon: Package,
    description: "发现和安装组件",
    gradient: "from-indigo-500 to-purple-500"
  }, {
    id: "filesync",
    name: "文件",
    icon: RefreshCw,
    description: "同步和管理文件",
    gradient: "from-teal-500 to-cyan-500"
  }, {
    id: "jobqueue",
    name: "任务队列",
    icon: ListTodo,
    description: "管理和监控任务执行",
    gradient: "from-yellow-500 to-orange-500"
  }, {
    id: "diagnostics",
    name: "诊断",
    icon: Stethoscope,
    description: "系统诊断和故障排除",
    gradient: "from-rose-500 to-pink-500"
  }, {
    id: "jupyter",
    name: "Jupyter",
    icon: Package,
    description: "Jupyter云上开发环境",
    gradient: "from-amber-500 to-yellow-500"
  }];
  const handleModuleClick = (moduleId: string) => {
    onNavigate?.(moduleId);
  };
  return <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">工作空间</h1>
        <p className="text-gray-400">欢迎来到个人工作空间，开始定制你的专属工作空间吧</p>
      </div>

      {/* 功能模块 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">组件</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {functionModules.map(module => {
          const Icon = module.icon;
          return <div key={module.id} onClick={() => handleModuleClick(module.id)} className="group cursor-pointer">
                <Card className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* 图标容器 */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* 模块名称 */}
                    <h3 className="text-base font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                      {module.name}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                      {module.description}
                    </p>
                  </div>
                </Card>
              </div>;
        })}
        </div>
      </Card>

      {/* 已安装的组件 */}
      {installedComponents.length > 0 && <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">已安装的组件</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {installedComponents.map(component => <div key={component.id} className="group cursor-pointer">
                <Card className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* 图标容器 */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{component.icon}</span>
                    </div>
                    
                    {/* 组件名称 */}
                    <h3 className="text-base font-semibold text-white group-hover:text-green-200 transition-colors duration-300">
                      {component.name}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                      {component.description}
                    </p>
                  </div>
                </Card>
              </div>)}
          </div>
        </Card>}
    </div>;
};
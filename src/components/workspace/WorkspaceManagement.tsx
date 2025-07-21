import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceIconGrid } from "./WorkspaceIconGrid";
import { Activity, Cpu, HardDrive, Zap, Users, Calendar, Clock, Server, BarChart3, Settings, Plus, Shuffle, Home } from "lucide-react";
interface WorkspaceManagementProps {
  currentWorkspace: any;
  onNavigate?: (nav: string) => void;
}
export const WorkspaceManagement = ({
  currentWorkspace,
  onNavigate
}: WorkspaceManagementProps) => {
  // 模拟工作空间状态数据
  const workspaceStatus = {
    isRunning: true,
    uptime: "2天 14小时",
    cpuUsage: 65,
    memoryUsage: 72,
    storageUsage: 45,
    activeUsers: 3,
    totalTasks: 8,
    completedTasks: 5,
    lastActivity: "5分钟前"
  };
  const getStatusColor = (isRunning: boolean) => {
    return isRunning ? "bg-green-500" : "bg-red-500";
  };
  const getUsageColor = (usage: number) => {
    if (usage < 50) return "text-green-400";
    if (usage < 80) return "text-yellow-400";
    return "text-red-400";
  };
  return <div className="p-6 space-y-6 mx-0 px-0 py-0 my-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">工作空间管理</h2>
        <div className="flex flex-col gap-2">
          
          <Button variant="outline" size="sm" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20 flex items-center justify-center h-10 w-10 p-0">
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 工作空间卡片网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 当前工作空间卡片 */}
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 relative">
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              当前空间
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(workspaceStatus.isRunning)} animate-pulse`} />
            <h3 className="text-lg font-semibold text-white">
              {currentWorkspace?.name || "空白工作空间"}
            </h3>
            <Badge className={`${workspaceStatus.isRunning ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} text-xs`}>
              {workspaceStatus.isRunning ? '运行中' : '已停止'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* CPU 使用率 */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-300">CPU</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {workspaceStatus.cpuUsage}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{
                width: `${workspaceStatus.cpuUsage}%`
              }} />
              </div>
            </div>

            {/* 内存使用率 */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-300">内存</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {workspaceStatus.memoryUsage}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-300" style={{
                width: `${workspaceStatus.memoryUsage}%`
              }} />
              </div>
            </div>
          </div>

          {/* VSCode和SSH状态 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-300">VSCode</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">已连接</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-300">SSH</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">活跃</Badge>
            </div>
          </div>
        </Card>

        {/* 其他工作空间卡片 */}
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <h3 className="text-lg font-semibold text-white">
              数据分析空间
            </h3>
            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
              已停止
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* CPU 使用率 */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-300">CPU</span>
              </div>
              <div className="text-lg font-bold text-gray-400 mb-1">
                0%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-gray-500 h-1.5 rounded-full" style={{
                width: '0%'
              }} />
              </div>
            </div>

            {/* 内存使用率 */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-300">内存</span>
              </div>
              <div className="text-lg font-bold text-gray-400 mb-1">
                0%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div className="bg-gray-500 h-1.5 rounded-full" style={{
                width: '0%'
              }} />
              </div>
            </div>
          </div>

          {/* VSCode和SSH状态 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-300">VSCode</span>
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">未连接</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-300">SSH</span>
              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">离线</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* 详细统计信息 */}
      

      {/* 功能模块快速访问 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">组件</h3>
        <WorkspaceIconGrid onIconClick={onNavigate || (() => {})} />
      </Card>

      {/* 快速操作 */}
      
    </div>;
};
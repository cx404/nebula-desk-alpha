import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkspaceIconGrid } from "./WorkspaceIconGrid";
import { Activity, Cpu, HardDrive, Zap, Users, Calendar, Clock, Server, BarChart3, Settings } from "lucide-react";
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
        <Button variant="outline" size="sm" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20">
          <Settings className="w-4 h-4 mr-2" />
          设置
        </Button>
      </div>

      {/* 工作空间概览卡片 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(workspaceStatus.isRunning)} animate-pulse`} />
            <h3 className="text-xl font-semibold text-white">
              {currentWorkspace?.name || "默认工作空间"}
            </h3>
            <Badge className={`${workspaceStatus.isRunning ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              {workspaceStatus.isRunning ? '运行中' : '已停止'}
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            运行时间: {workspaceStatus.uptime}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* CPU 使用率 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">CPU</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {workspaceStatus.cpuUsage}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{
              width: `${workspaceStatus.cpuUsage}%`
            }} />
            </div>
          </div>

          {/* 内存使用率 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">内存</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {workspaceStatus.memoryUsage}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{
              width: `${workspaceStatus.memoryUsage}%`
            }} />
            </div>
          </div>

          {/* 存储使用率 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <HardDrive className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">存储</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {workspaceStatus.storageUsage}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{
              width: `${workspaceStatus.storageUsage}%`
            }} />
            </div>
          </div>

          {/* 活跃用户 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-gray-300">活跃用户</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {workspaceStatus.activeUsers}
            </div>
            <div className="text-xs text-gray-400">
              当前在线
            </div>
          </div>
        </div>

        {/* 任务状态 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h4 className="font-semibold text-white">任务状态</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">总任务</span>
                <span className="text-white font-medium">{workspaceStatus.totalTasks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">已完成</span>
                <span className="text-green-400 font-medium">{workspaceStatus.completedTasks}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">进行中</span>
                <span className="text-yellow-400 font-medium">{workspaceStatus.totalTasks - workspaceStatus.completedTasks}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-5 h-5 text-pink-400" />
              <h4 className="font-semibold text-white">活动信息</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">最后活动</span>
                <span className="text-white font-medium">{workspaceStatus.lastActivity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">创建时间</span>
                <span className="text-gray-400 font-medium">
                  {currentWorkspace?.created_at ? new Date(currentWorkspace.created_at).toLocaleDateString() : '2024-01-15'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">工作空间类型</span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {currentWorkspace?.type || '通用'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* 功能模块快速访问 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">组件</h3>
        <WorkspaceIconGrid onIconClick={onNavigate || (() => {})} />
      </Card>

      {/* 快速操作 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">快速操作</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20">
            <Server className="w-4 h-4 mr-2" />
            重启工作空间
          </Button>
          <Button variant="outline" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20">
            <Calendar className="w-4 h-4 mr-2" />
            查看日志
          </Button>
          <Button variant="outline" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20">
            <Clock className="w-4 h-4 mr-2" />
            定时任务
          </Button>
          <Button variant="outline" className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20">
            <Settings className="w-4 h-4 mr-2" />
            高级设置
          </Button>
        </div>
      </Card>
    </div>;
};
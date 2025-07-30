import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, HardDrive, Zap, Users, Calendar, Clock, Server, BarChart3, Settings, Plus, Shuffle, Home, Play, CheckCircle, DollarSign, MoreHorizontal, X } from "lucide-react";
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

  // 任务统计数据
  const taskStats = [
    {
      label: "运行中",
      value: "2",
      icon: Play,
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      label: "排队中",
      value: "1",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      label: "已完成",
      value: "15",
      icon: CheckCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      label: "总费用",
      value: "$127.50",
      icon: DollarSign,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    }
  ];

  // 任务列表数据
  const tasks = [
    {
      id: "1",
      name: "BERT Fine-tuning",
      type: "ML-Training",
      workspace: "空白工作空间",
      status: "running",
      progress: 78,
      runtime: "2h 45m",
      cost: "$23.50",
      started: "3小时前"
    },
    {
      id: "2",
      name: "数据预处理",
      type: "Data-Processing",
      workspace: "数据分析空间",
      status: "completed",
      progress: 100,
      runtime: "45m",
      cost: "$8.95",
      started: "1小时前"
    },
    {
      id: "3",
      name: "模型推理",
      type: "Inference",
      workspace: "空白工作空间",
      status: "queued",
      progress: 0,
      runtime: "0m",
      cost: "$0.00",
      started: "排队中"
    }
  ];

  const getStatusColor = (isRunning: boolean) => {
    return isRunning ? "bg-green-500" : "bg-red-500";
  };
  
  const getUsageColor = (usage: number) => {
    if (usage < 50) return "text-green-400";
    if (usage < 80) return "text-yellow-400";
    return "text-red-400";
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">运行中</Badge>;
      case "queued":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">排队中</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">已完成</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">失败</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">未知</Badge>;
    }
  };
  return <div className="p-6 space-y-6 mx-0 px-0 py-0 my-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">工作空间管理</h2>
        <div className="flex flex-col gap-2">
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-purple-200 border-purple-300/30 hover:bg-purple-500/20 flex items-center justify-center h-10 w-10 p-0"
            onClick={() => onNavigate?.('home')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 工作空间卡片网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 当前工作空间卡片 */}
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 relative group hover:bg-white/15 transition-all duration-300 cursor-pointer">
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              当前空间
            </Badge>
          </div>
          
          {/* 悬停蒙版 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-6">
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/20">
                进入空间
              </Button>
              <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/20">
                删除空间
              </Button>
            </div>
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
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 relative group hover:bg-white/15 transition-all duration-300 cursor-pointer">
          {/* 悬停蒙版 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end pr-6">
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/20">
                进入空间
              </Button>
              <Button variant="outline" size="sm" className="text-red-400 border-red-400/30 hover:bg-red-500/20">
                删除空间
              </Button>
            </div>
          </div>
          
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

      {/* 任务情况 */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">任务情况</h3>
          <span className="text-gray-400 text-sm">跨工作空间任务监控</span>
        </div>

        {/* 任务统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {taskStats.map((stat, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-300 text-sm">{stat.label}</h4>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 任务列表 */}
        <div className="space-y-3">
          {tasks.map(task => (
            <Card key={task.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'running' ? 'bg-green-400' : 
                    task.status === 'queued' ? 'bg-orange-400' : 
                    task.status === 'completed' ? 'bg-blue-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <h4 className="text-white font-medium text-sm">{task.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{task.type}</span>
                      <span>•</span>
                      <span>工作空间: {task.workspace}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTaskStatusBadge(task.status)}
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 w-8 p-0">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {task.status === 'running' && task.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>进度</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-1.5" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-gray-400 mb-1">运行时间</div>
                  <p className="text-white font-medium">{task.runtime}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">费用</div>
                  <p className="text-white font-medium">{task.cost}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">开始时间</div>
                  <p className="text-white font-medium">{task.started}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

    </div>;
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Clock, CheckCircle, DollarSign, Zap, MoreHorizontal, X, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
export const JobQueue = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState("all");
  
  const workspaces = [
    { value: "all", label: "全部工作空间" },
    { value: "workspace-1", label: "机器学习工作空间" },
    { value: "workspace-2", label: "深度学习工作空间" },
    { value: "workspace-3", label: "数据分析工作空间" }
  ];

  const stats = [{
    label: "运行中",
    value: "1",
    icon: Play,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  }, {
    label: "排队中",
    value: "1",
    icon: Clock,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20"
  }, {
    label: "已完成",
    value: "23",
    icon: CheckCircle,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  }, {
    label: "总费用",
    value: "$34.85",
    icon: DollarSign,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  }];
  const jobs = [{
    id: "1",
    name: "BERT在IMDB数据集上微调",
    type: "机器学习训练-v3",
    gpu: "Tesla V100",
    status: "running",
    progress: 78,
    runtime: "2小时45分钟",
    eta: "剩余45分钟",
    cost: "$23.50",
    gpuUsage: "94%",
    started: "3小时前开始"
  }, {
    id: "2",
    name: "图像分类训练",
    type: "计算机视觉开发",
    gpu: "RTX 4090",
    status: "queued",
    progress: 0,
    runtime: "0分钟",
    eta: "约3小时20分钟",
    cost: "$0.00",
    gpuUsage: "0%",
    started: "15分钟前排队"
  }, {
    id: "3",
    name: "神经风格迁移",
    type: "创意AI",
    gpu: "RTX 3080",
    status: "completed",
    progress: 100,
    runtime: "1小时22分钟",
    eta: "已完成",
    cost: "$8.95",
    gpuUsage: "87%",
    started: "4小时前开始"
  }, {
    id: "4",
    name: "大模型推理",
    type: "推理服务器",
    gpu: "Tesla A100",
    status: "failed",
    progress: 45,
    runtime: "13分钟",
    eta: "失败 - 内存溢出",
    cost: "$2.40",
    gpuUsage: "65%",
    started: "1小时前开始"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-400";
      case "queued":
        return "text-orange-400";
      case "completed":
        return "text-blue-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">运行中</Badge>;
      case "queued":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">排队中</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">已完成</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">失败</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">未知</Badge>;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">任务队列</h1>
          <p className="text-gray-400">实时监控并管理您的任务运行情况</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="选择工作空间" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
              {workspaces.map((workspace) => (
                <SelectItem 
                  key={workspace.value} 
                  value={workspace.value}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
                  {workspace.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            创建任务
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Card key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-300 text-sm">{stat.label}</h3>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>)}
      </div>

      {/* Active Jobs */}
      <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">活跃任务</h2>
          <span className="text-gray-400 text-sm">实时监控您的训练和推理任务</span>
        </div>

        <div className="space-y-4">
          {jobs.map(job => <Card key={job.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${job.status === 'running' ? 'bg-green-400' : job.status === 'queued' ? 'bg-orange-400' : job.status === 'completed' ? 'bg-blue-400' : 'bg-red-400'}`}></div>
                  <div>
                    <h3 className="text-white font-semibold">{job.name}</h3>
                    <p className="text-gray-400 text-sm">{job.type} • {job.gpu}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(job.status)}
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  {job.status === 'queued' && <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <X className="w-4 h-4" />
                    </Button>}
                </div>
              </div>

              {job.status === 'running' && <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>进度</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>}

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>运行时间</span>
                  </div>
                  <p className="text-white font-medium">{job.runtime}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">预计完成时间</div>
                  <p className="text-white font-medium">{job.eta}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>费用</span>
                  </div>
                  <p className="text-white font-medium">{job.cost}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span>GPU使用率</span>
                  </div>
                  <p className="text-white font-medium">{job.gpuUsage}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">开始时间</div>
                  <p className="text-white font-medium">{job.started}</p>
                </div>
              </div>

              {job.status === 'failed' && <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10">
                    重试
                  </Button>
                </div>}
            </Card>)}
        </div>
      </Card>
    </div>;
};
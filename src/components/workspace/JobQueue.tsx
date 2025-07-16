import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, CheckCircle, DollarSign, Zap, MoreHorizontal, X } from "lucide-react";
export const JobQueue = () => {
  const stats = [{
    label: "Running",
    value: "1",
    icon: Play,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  }, {
    label: "Queued",
    value: "1",
    icon: Clock,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20"
  }, {
    label: "Completed",
    value: "23",
    icon: CheckCircle,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  }, {
    label: "Total Cost",
    value: "$34.85",
    icon: DollarSign,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  }];
  const jobs = [{
    id: "1",
    name: "BERT Fine-tuning on IMDB",
    type: "ML-Training-v3",
    gpu: "Tesla V100",
    status: "running",
    progress: 78,
    runtime: "2h 45m",
    eta: "45m remaining",
    cost: "$23.50",
    gpuUsage: "94%",
    started: "3 hours ago"
  }, {
    id: "2",
    name: "Image Classification Training",
    type: "Computer-Vision-Dev",
    gpu: "RTX 4090",
    status: "queued",
    progress: 0,
    runtime: "0m",
    eta: "~3h 20m",
    cost: "$0.00",
    gpuUsage: "0%",
    started: "Queued 15m ago"
  }, {
    id: "3",
    name: "Neural Style Transfer",
    type: "Creative-AI",
    gpu: "RTX 3080",
    status: "completed",
    progress: 100,
    runtime: "1h 22m",
    eta: "Completed",
    cost: "$8.95",
    gpuUsage: "87%",
    started: "4 hours ago"
  }, {
    id: "4",
    name: "Large Model Inference",
    type: "Inference-Server",
    gpu: "Tesla A100",
    status: "failed",
    progress: 45,
    runtime: "13m",
    eta: "Failed - OOM",
    cost: "$2.40",
    gpuUsage: "65%",
    started: "1 hour ago"
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
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Running</Badge>;
      case "queued":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Queued</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">任务队列</h1>
          <p className="text-gray-400">实时监控并管理您的任务运行情况</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          + Submit Job
        </Button>
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
          <h2 className="text-xl font-semibold text-white">Active Jobs</h2>
          <span className="text-gray-400 text-sm">Real-time monitoring of your training and inference jobs</span>
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
                    <span>Progress</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>}

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Runtime</span>
                  </div>
                  <p className="text-white font-medium">{job.runtime}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">ETA</div>
                  <p className="text-white font-medium">{job.eta}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Cost</span>
                  </div>
                  <p className="text-white font-medium">{job.cost}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span>GPU Usage</span>
                  </div>
                  <p className="text-white font-medium">{job.gpuUsage}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Started</div>
                  <p className="text-white font-medium">{job.started}</p>
                </div>
              </div>

              {job.status === 'failed' && <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10">
                    Retry
                  </Button>
                </div>}
            </Card>)}
        </div>
      </Card>
    </div>;
};
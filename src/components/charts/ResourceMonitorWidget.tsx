import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Monitor, Cpu, HardDrive, Zap } from "lucide-react";

interface ResourceMonitorWidgetProps {
  data: Array<{
    time: string;
    cpu: number;
    memory: number;
    gpu: number;
  }>;
}

export const ResourceMonitorWidget = ({ data }: ResourceMonitorWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 获取最新的资源数据
  const latestData = data[data.length - 1] || { cpu: 0, memory: 0, gpu: 0, time: '' };
  
  const getResourceStatus = (usage: number) => {
    if (usage > 80) return { status: "high", color: "bg-red-500/20 text-red-400 border-red-500/30" };
    if (usage > 60) return { status: "medium", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    return { status: "low", color: "bg-green-500/20 text-green-400 border-green-500/30" };
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="glass-card p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">资源监控</h3>
                <p className="text-sm text-gray-400">实时系统状态</p>
              </div>
            </div>
            <Badge className={getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).color}>
              {getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).status === "high" ? "高负载" :
               getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).status === "medium" ? "中等负载" : "正常"}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">CPU</span>
              <span className="text-white font-medium">{latestData.cpu}%</span>
            </div>
            <Progress value={latestData.cpu} className="h-2" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">内存</span>
              <span className="text-white font-medium">{latestData.memory}%</span>
            </div>
            <Progress value={latestData.memory} className="h-2" />
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">GPU</span>
              <span className="text-white font-medium">{latestData.gpu}%</span>
            </div>
            <Progress value={latestData.gpu} className="h-2" />
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl h-[80vh] bg-gradient-to-br from-purple-950/90 to-indigo-950/90 backdrop-blur-xl border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-400" />
            资源监控动态看板
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto">
          {/* 实时状态卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">CPU使用率</p>
                  <p className="text-2xl font-bold text-white">{latestData.cpu}%</p>
                </div>
              </div>
              <Progress value={latestData.cpu} className="mt-3 h-2" />
            </Card>
            
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">内存使用率</p>
                  <p className="text-2xl font-bold text-white">{latestData.memory}%</p>
                </div>
              </div>
              <Progress value={latestData.memory} className="mt-3 h-2" />
            </Card>
            
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">GPU使用率</p>
                  <p className="text-2xl font-bold text-white">{latestData.gpu}%</p>
                </div>
              </div>
              <Progress value={latestData.gpu} className="mt-3 h-2" />
            </Card>
          </div>
          
          {/* 历史趋势 */}
          <Card className="p-6 bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">资源使用趋势</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">最近15分钟平均CPU使用率</span>
                <span className="text-white font-medium">
                  {data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.cpu, 0) / data.length) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">最近15分钟平均内存使用率</span>
                <span className="text-white font-medium">
                  {data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.memory, 0) / data.length) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">最近15分钟平均GPU使用率</span>
                <span className="text-white font-medium">
                  {data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.gpu, 0) / data.length) : 0}%
                </span>
              </div>
            </div>
          </Card>
          
          {/* 系统信息 */}
          <Card className="p-6 bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">系统信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">操作系统</span>
                  <span className="text-white">Ubuntu 22.04 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU核心数</span>
                  <span className="text-white">8 cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">总内存</span>
                  <span className="text-white">32 GB</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">GPU型号</span>
                  <span className="text-white">NVIDIA A100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GPU显存</span>
                  <span className="text-white">80 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">运行时间</span>
                  <span className="text-white">72小时 15分钟</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
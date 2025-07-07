import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Monitor } from "lucide-react";

interface ResourceMonitorWidgetProps {
  data: Array<{
    time: string;
    cpu: number;
    memory: number;
    gpu: number;
  }>;
  onClick: () => void;
  isActive: boolean;
}

export const ResourceMonitorWidget = ({ data, onClick, isActive }: ResourceMonitorWidgetProps) => {
  
  // 获取最新的资源数据
  const latestData = data[data.length - 1] || { cpu: 0, memory: 0, gpu: 0, time: '' };
  
  const getResourceStatus = (usage: number) => {
    if (usage > 80) return { status: "high", color: "bg-red-500/20 text-red-400 border-red-500/30" };
    if (usage > 60) return { status: "medium", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    return { status: "low", color: "bg-green-500/20 text-green-400 border-green-500/30" };
  };

  return (
    <Card 
      className={`glass-card p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group relative ${
        isActive ? 'ring-2 ring-blue-500/50 bg-blue-500/10' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
            isActive ? 'scale-110' : ''
          }`}>
            <Monitor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">资源监控</h3>
            <p className="text-sm text-gray-400">点击查看详细图表</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).color}>
            {getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).status === "high" ? "高负载" :
             getResourceStatus(Math.max(latestData.cpu, latestData.memory, latestData.gpu)).status === "medium" ? "中等负载" : "正常"}
          </Badge>
          {isActive && (
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              已展开
            </Badge>
          )}
        </div>
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
      
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      )}
    </Card>
  );
};
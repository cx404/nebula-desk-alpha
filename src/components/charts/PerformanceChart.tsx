import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface PerformanceChartProps {
  data: Array<{
    model: string;
    throughput: number;
    latency: number;
    accuracy: string;
  }>;
}

const chartConfig = {
  throughput: {
    label: "吞吐量(tokens/s)",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  latency: {
    label: "延迟(ms)",
    theme: {
      light: "hsl(220 60% 50%)",
      dark: "hsl(220 60% 50%)",
    },
  },
};

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState(data);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => 
        prev.map(item => ({
          ...item,
          throughput: item.throughput + Math.floor(Math.random() * 20 - 10),
          latency: Math.max(50, item.latency + Math.floor(Math.random() * 40 - 20)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleModelClick = (model: string) => {
    setSelectedModel(selectedModel === model ? null : model);
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">模型性能对比</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">实时监控</span>
        </div>
      </div>
      
      {/* 模型列表 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {realTimeData.map((model) => (
          <div
            key={model.model}
            className={`p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
              selectedModel === model.model ? 'ring-2 ring-blue-500 bg-blue-500/10' : ''
            }`}
            onClick={() => handleModelClick(model.model)}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-white">{model.model}</h4>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                在线
              </Badge>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">吞吐量:</span>
                <span className="text-white">{model.throughput} t/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">延迟:</span>
                <span className="text-white">{model.latency}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">准确率:</span>
                <span className="text-white">{model.accuracy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 详细图表 */}
      {selectedModel && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">
            {selectedModel} - 实时性能监控
          </h4>
          <div className="h-32 text-center flex items-center justify-center text-gray-400">
            实时性能曲线图表区域
          </div>
        </div>
      )}
    </Card>
  );
};
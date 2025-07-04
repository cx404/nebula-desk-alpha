import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ResourceMonitorChartProps {
  data: Array<{
    time: string;
    cpu: number;
    memory: number;
    gpu: number;
  }>;
}

const chartConfig = {
  cpu: {
    label: "CPU使用率",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  memory: {
    label: "内存使用率", 
    theme: {
      light: "hsl(var(--secondary))",
      dark: "hsl(var(--secondary))",
    },
  },
  gpu: {
    label: "GPU使用率",
    theme: {
      light: "hsl(var(--accent))",
      dark: "hsl(var(--accent))",
    },
  },
};

export const ResourceMonitorChart = ({ data }: ResourceMonitorChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">资源监控</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <AreaChart data={data}>
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="cpu"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.6)"
          />
          <Area
            type="monotone"
            dataKey="memory"
            stackId="1"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary) / 0.6)"
          />
          <Area
            type="monotone"
            dataKey="gpu"
            stackId="1"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent) / 0.6)"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
};
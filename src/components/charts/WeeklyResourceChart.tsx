import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";

interface WeeklyResourceChartProps {
  data: Array<{
    day: string;
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

export const WeeklyResourceChart = ({ data }: WeeklyResourceChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">本周资源使用情况</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <LineChart data={data}>
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend 
            wrapperStyle={{ 
              color: "hsl(var(--foreground))",
              fontSize: "12px"
            }}
          />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--secondary))", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="gpu"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--accent))", strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
};
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface APIUsageChartProps {
  data: Array<{
    time: string;
    requests: number;
    errors: number;
    latency: number;
  }>;
}
const chartConfig = {
  requests: {
    label: "API请求数",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))"
    }
  },
  errors: {
    label: "错误数",
    theme: {
      light: "hsl(220 60% 50%)",
      dark: "hsl(220 60% 50%)"
    }
  },
  latency: {
    label: "延迟(ms)",
    theme: {
      light: "hsl(var(--accent))",
      dark: "hsl(var(--accent))"
    }
  }
};
export const APIUsageChart = ({
  data
}: APIUsageChartProps) => {
  return <Card className="glass-card p-6 px-0">
      <h3 className="text-lg font-semibold mb-4 text-white mx-[19px]">API使用统计</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={{
          fill: "hsl(var(--primary))"
        }} />
          <Line type="monotone" dataKey="errors" stroke="hsl(220 60% 50%)" strokeWidth={2} dot={{
          fill: "hsl(220 60% 50%)"
        }} />
        </LineChart>
      </ChartContainer>
    </Card>;
};
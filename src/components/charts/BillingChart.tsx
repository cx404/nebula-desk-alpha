import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface BillingChartProps {
  data: Array<{
    date: string;
    cost: number;
    gpu: number;
    storage: number;
    api: number;
  }>;
}
const chartConfig = {
  cost: {
    label: "总费用",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))"
    }
  },
  gpu: {
    label: "GPU费用",
    theme: {
      light: "hsl(var(--secondary))",
      dark: "hsl(var(--secondary))"
    }
  },
  storage: {
    label: "存储费用",
    theme: {
      light: "hsl(var(--accent))",
      dark: "hsl(var(--accent))"
    }
  },
  api: {
    label: "API费用",
    theme: {
      light: "hsl(var(--muted))",
      dark: "hsl(var(--muted))"
    }
  }
};
export const BillingChart = ({
  data
}: BillingChartProps) => {
  return <Card className="glass-card p-6 px-0">
      <h3 className="text-lg font-semibold mb-4 text-white mx-[19px]">费用趋势</h3>
      <ChartContainer config={chartConfig} className="h-[300px]">
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="gpu" stackId="a" fill="hsl(var(--secondary) / 0.8)" />
          <Bar dataKey="storage" stackId="a" fill="hsl(var(--accent) / 0.8)" />
          <Bar dataKey="api" stackId="a" fill="hsl(var(--muted) / 0.8)" />
        </BarChart>
      </ChartContainer>
    </Card>;
};
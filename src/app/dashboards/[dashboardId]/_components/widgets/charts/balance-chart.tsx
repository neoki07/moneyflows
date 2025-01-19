"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartWidgetCard } from "../../chart-widget-card";

const chartConfig = {
  income: {
    label: "収入",
    color: "#66C2B8",
  },
  expense: {
    label: "支出",
    color: "#FF9191",
  },
  balance: {
    label: "差額",
    color: "#1976D2",
  },
};

const mockData = [
  { month: 1, income: 300000, expense: -250000, balance: 50000 },
  { month: 2, income: 320000, expense: -240000, balance: 80000 },
  { month: 3, income: 310000, expense: -260000, balance: 50000 },
  { month: 4, income: 350000, expense: -270000, balance: 80000 },
  { month: 5, income: 300000, expense: -240000, balance: 60000 },
  { month: 6, income: 330000, expense: -280000, balance: 50000 },
  { month: 7, income: 340000, expense: -260000, balance: 80000 },
  { month: 8, income: 360000, expense: -290000, balance: 70000 },
  { month: 9, income: 320000, expense: -250000, balance: 70000 },
  { month: 10, income: 340000, expense: -260000, balance: 80000 },
  { month: 11, income: 350000, expense: -270000, balance: 80000 },
  { month: 12, income: 400000, expense: -300000, balance: 100000 },
];

function yAxisTickFormatter(value: number) {
  const formatter = new Intl.NumberFormat("ja-JP", {
    notation: "compact",
  });
  return `${formatter.format(value)}円`;
}

export function BalanceChart() {
  return (
    <ChartWidgetCard title="月次収支">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ComposedChart
          accessibilityLayer
          data={mockData}
          margin={{ top: 72 }}
          maxBarSize={48}
          stackOffset="sign"
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => `${value}月`}
            interval="preserveStart"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={yAxisTickFormatter}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(_, [payload]) => {
                  return `${payload?.payload?.month}月`;
                }}
                indicator="dot"
              />
            }
          />
          <Bar
            dataKey="income"
            fill="var(--color-income)"
            fillOpacity={0.85}
            radius={[4, 4, 0, 0]}
            stackId="income-and-expense"
          />
          <Bar
            dataKey="expense"
            fill="var(--color-expense)"
            fillOpacity={0.85}
            radius={[4, 4, 0, 0]}
            stackId="income-and-expense"
          />
          <Line
            dataKey="balance"
            stroke="var(--color-balance)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 1 }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </ComposedChart>
      </ChartContainer>
    </ChartWidgetCard>
  );
}

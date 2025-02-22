"use client";

import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useGridStackContext,
  useGridStackWidgetContext,
} from "@/lib/gridstack";
import { api } from "@/lib/hono";

import { useDateStore } from "../../../_stores/use-date-store";
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

type MonthlyBalance = {
  month: number;
  income: number;
  expense: number;
  balance: number;
};

type MonthlyBalanceResponse = {
  monthlyBalances: MonthlyBalance[];
};

type BalanceChartProps = {
  incomeCategories?: string[];
  expenseCategories?: string[];
};

function yAxisTickFormatter(value: number) {
  const formatter = new Intl.NumberFormat("ja-JP", {
    notation: "compact",
  });
  return `${formatter.format(value)}円`;
}

type BalanceChartContentProps = {
  data: MonthlyBalance[];
};

export function BalanceChartContent({ data }: BalanceChartContentProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ComposedChart
        accessibilityLayer
        data={data}
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
  );
}

export function BalanceChart({
  incomeCategories = [],
  expenseCategories = [],
}: BalanceChartProps) {
  const { widget } = useGridStackWidgetContext();
  const { removeWidget } = useGridStackContext();
  const { date } = useDateStore();

  const fetcher = async () => {
    if (!date) {
      return { monthlyBalances: [] };
    }

    const formatYearMonth = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    const endMonth = new Date(date);
    const startMonth = new Date(date);
    startMonth.setMonth(startMonth.getMonth() - 11);

    const response = await api.transactions["monthly-balances"].$get({
      query: {
        startMonth: formatYearMonth(startMonth),
        endMonth: formatYearMonth(endMonth),
        incomeCategories: incomeCategories.join(","),
        expenseCategories: expenseCategories.join(","),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch balance data");
    }
    return response.json();
  };

  const { data, isLoading } = useSWR<MonthlyBalanceResponse>(
    [
      widget.id,
      date?.toISOString(),
      incomeCategories.join(","),
      expenseCategories.join(","),
    ],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const handleRemove = () => {
    if (widget.id) {
      removeWidget(widget.id);
    }
  };

  if (isLoading || !data) {
    return null;
  }

  return (
    <ChartWidgetCard title="月次収支" onRemove={handleRemove}>
      <BalanceChartContent data={data.monthlyBalances} />
    </ChartWidgetCard>
  );
}

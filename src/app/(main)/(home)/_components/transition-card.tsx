"use client";

import useSWR from "swr";

import { BalanceChartContent } from "@/app/(main)/dashboards/[dashboardId]/_components/widgets/charts/balance-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/hono";

type MonthlyBalance = {
  month: number;
  income: number;
  expense: number;
  balance: number;
};

type MonthlyBalanceResponse = {
  monthlyBalances: MonthlyBalance[];
};

export function TransitionCard() {
  const fetcher = async () => {
    const response = await api.transactions["monthly-balances"].$get();
    if (!response.ok) {
      throw new Error("Failed to fetch balance data");
    }
    return response.json();
  };

  const { data, isLoading } = useSWR<MonthlyBalanceResponse>(
    "monthly-balances",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6">
      <h2 className="text-xl font-bold">収支推移</h2>
      <div className="h-[384px]">
        {!isLoading && data ? (
          <BalanceChartContent data={data.monthlyBalances} />
        ) : (
          <Skeleton className="h-full" />
        )}
      </div>
    </div>
  );
}

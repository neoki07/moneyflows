import { Suspense } from "react";

import { LatestTransactionsCard } from "./_components/latest-transactions-card";
import { MonthlyBalanceCard } from "./_components/monthly-balance-card";
import { MonthlyExpensesCard } from "./_components/monthly-expenses-card";
import { MonthlyIncomeCard } from "./_components/monthly-income-card";
import { MonthlyIncomeCardSkeleton } from "./_components/monthly-income-card-skeleton";
import { TotalBalanceCard } from "./_components/total-balance-card";
import { TotalBalanceCardSkeleton } from "./_components/total-balance-card-skeleton";
import { TransitionCard } from "./_components/transition-card";

export default function Home() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">ホーム</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <Suspense fallback={<TotalBalanceCardSkeleton />}>
            <TotalBalanceCard />
          </Suspense>
          <Suspense fallback={<MonthlyIncomeCardSkeleton />}>
            <MonthlyIncomeCard />
          </Suspense>
          <MonthlyExpensesCard />
          <MonthlyBalanceCard />
        </div>
        <TransitionCard />
        <LatestTransactionsCard />
      </div>
    </div>
  );
}

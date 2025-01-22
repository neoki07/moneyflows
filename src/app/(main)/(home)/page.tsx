import { LatestTransactionsCard } from "./_components/latest-transactions-card";
import { MonthlyBalanceCard } from "./_components/monthly-balance-card";
import { MonthlyExpensesCard } from "./_components/monthly-expenses-card";
import { MonthlyIncomeCard } from "./_components/monthly-income-card";
import { TotalBalanceCard } from "./_components/total-balance-card";
import { TransitionCard } from "./_components/transition-card";

export default function Home() {
  return (
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr]">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl">ホーム</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <TotalBalanceCard />
          <MonthlyIncomeCard />
          <MonthlyExpensesCard />
          <MonthlyBalanceCard />
        </div>
        <TransitionCard />
        <LatestTransactionsCard />
      </div>
    </div>
  );
}

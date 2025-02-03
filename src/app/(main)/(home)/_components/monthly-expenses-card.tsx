import { formatAmount } from "@/lib/amount";

import { fetchMonthlyExpense } from "../_lib/fetch";

export async function MonthlyExpensesCard() {
  const { monthlyExpense } = await fetchMonthlyExpense();

  return (
    <div className="flex flex-col gap-1 rounded-lg border px-4 py-3.5">
      <h2 className="text-[13px] font-semibold text-slate-700">今月の支出</h2>
      <div className="flex items-end gap-1 font-semibold">
        <span className="text-2xl">{formatAmount(monthlyExpense)}</span>円
      </div>
    </div>
  );
}

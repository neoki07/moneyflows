import { Suspense } from "react";

import { CategoriesSkeleton } from "./_components/categories-skeleton";
import { ExpenseCategories } from "./_components/expense-categories";
import { IncomeCategories } from "./_components/income-categories";

export default function Page() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">カテゴリー</h1>
      </div>
      <div className="space-y-8">
        <Suspense fallback={<CategoriesSkeleton type="income" />}>
          <IncomeCategories />
        </Suspense>
        <Suspense fallback={<CategoriesSkeleton type="expense" />}>
          <ExpenseCategories />
        </Suspense>
      </div>
    </div>
  );
}

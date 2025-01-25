import { AddExpenseCategoryButton } from "./_components/add-expense-category-button";
import { AddIncomeCategoryButton } from "./_components/add-income-category-button";
import { CategoryCard } from "./_components/category-card";

export default function Page() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">カテゴリー</h1>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">収入</h2>
            <AddIncomeCategoryButton />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">支出</h2>
            <AddExpenseCategoryButton />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
      </div>
    </div>
  );
}

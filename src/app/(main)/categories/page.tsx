import { AddCategoryButton } from "./_components/add-category-button";
import { CategoryCard } from "./_components/category-card";
import { fetchCategories } from "./_lib/fetch";

export default async function Page() {
  const { categories } = await fetchCategories();

  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">カテゴリー</h1>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">収入</h2>
            <AddCategoryButton type="income" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categories.income.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">支出</h2>
            <AddCategoryButton type="expense" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {categories.expense.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

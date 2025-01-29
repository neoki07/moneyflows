import { fetchExpenseCategories } from "../_lib/fetch";
import { AddCategoryButton } from "./add-category-button";
import { CategoryCard } from "./category-card";

export async function ExpenseCategories() {
  const categories = await fetchExpenseCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="flex-1 text-xl font-bold">支出</h2>
        <AddCategoryButton type="expense" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

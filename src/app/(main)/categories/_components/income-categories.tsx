import { fetchIncomeCategories } from "../_lib/fetch";
import { AddCategoryButton } from "./add-category-button";
import { CategoriesEmpty } from "./categories-empty";
import { CategoryCard } from "./category-card";

export async function IncomeCategories() {
  const categories = await fetchIncomeCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="flex-1 text-xl font-bold">収入</h2>
        <AddCategoryButton type="income" />
      </div>
      {categories.length === 0 ? (
        <CategoriesEmpty type="income" />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

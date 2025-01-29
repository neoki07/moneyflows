import { fetchIncomeCategories } from "../_lib/fetch";
import { CategoriesEmpty } from "./categories-empty";
import { CategoryCard } from "./category-card";

export async function IncomeCategories() {
  const categories = await fetchIncomeCategories();

  return categories.length === 0 ? (
    <CategoriesEmpty type="income" />
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

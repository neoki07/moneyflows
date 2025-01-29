import { fetchExpenseCategories } from "../_lib/fetch";
import { CategoriesEmpty } from "./categories-empty";
import { CategoryCard } from "./category-card";

export async function ExpenseCategories() {
  const categories = await fetchExpenseCategories();

  return categories.length === 0 ? (
    <CategoriesEmpty type="expense" />
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

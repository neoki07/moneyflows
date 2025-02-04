import { DeepReadonly } from "@/types";

import { fetchExpenseCategories, fetchIncomeCategories } from "../_lib/fetch";
import { CategoriesEmpty } from "./categories-empty";
import { CategoryCard } from "./category-card";

type CategoryListProps = DeepReadonly<{
  type: "income" | "expense";
}>;

export async function CategoryList({ type }: CategoryListProps) {
  const categories = await (type === "income"
    ? fetchIncomeCategories()
    : fetchExpenseCategories());

  if (categories.length === 0) {
    return <CategoriesEmpty type={type} />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

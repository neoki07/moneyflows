import { DeepReadonly } from "@/types";

import { fetchExpenseCategories, fetchIncomeCategories } from "../_lib/fetch";
import { CategoriesEmpty } from "./categories-empty";
import { CategoryCard } from "./category-card";

type CategoriesProps = DeepReadonly<{
  type: "income" | "expense";
}>;

export async function Categories({ type }: CategoriesProps) {
  const categories = await (type === "income"
    ? fetchIncomeCategories()
    : fetchExpenseCategories());

  return categories.length === 0 ? (
    <CategoriesEmpty type={type} />
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

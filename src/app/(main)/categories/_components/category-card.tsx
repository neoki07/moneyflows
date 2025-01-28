import { DeepReadonly } from "@/types";

import { ExpenseCategory, IncomeCategory } from "../_lib/types";
import { DeleteCategoryButton } from "./delete-category-button";
import { EditCategoryButton } from "./edit-category-button";

type CategoryCardProps = DeepReadonly<{
  category: IncomeCategory | ExpenseCategory;
}>;

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2 pl-4 font-medium">
      {category.name}
      <div>
        <EditCategoryButton />
        <DeleteCategoryButton category={category} />
      </div>
    </div>
  );
}

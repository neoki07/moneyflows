import { IconTrashX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

import { ExpenseCategory, IncomeCategory } from "../_lib/types";
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
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-50 hover:text-red-500"
        >
          <IconTrashX />
        </Button>
      </div>
    </div>
  );
}

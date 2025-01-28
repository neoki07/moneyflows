"use client";

import { IconTrashX } from "@tabler/icons-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

import { deleteCategory } from "../_actions/delete-category";
import { ExpenseCategory, IncomeCategory } from "../_lib/types";

type DeleteCategoryButtonProps = DeepReadonly<{
  category: IncomeCategory | ExpenseCategory;
}>;

export function DeleteCategoryButton({ category }: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteCategory(category.id);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-500 hover:bg-red-50 hover:text-red-500"
      disabled={isPending}
      onClick={handleDelete}
    >
      <IconTrashX />
    </Button>
  );
}

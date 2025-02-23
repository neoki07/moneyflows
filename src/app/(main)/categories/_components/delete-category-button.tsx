"use client";

import { IconTrashX } from "@tabler/icons-react";
import { useState, useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

import { deleteCategory } from "../_actions/delete-category";
import { ExpenseCategory, IncomeCategory } from "../_lib/types";

type DeleteCategoryButtonProps = DeepReadonly<{
  category: IncomeCategory | ExpenseCategory;
}>;

export function DeleteCategoryButton({ category }: DeleteCategoryButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteCategory(category.id);
        setOpen(false);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-50 hover:text-red-500"
          disabled={isPending}
        >
          <IconTrashX className="h-4 w-4" />
          <span className="sr-only">削除</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>カテゴリーの削除</AlertDialogTitle>
          <AlertDialogDescription>
            「{category.name}」を削除してもよろしいですか？
            <br />
            この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

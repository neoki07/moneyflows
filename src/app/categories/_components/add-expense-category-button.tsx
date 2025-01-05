"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import { CategoryForm } from "./category-form";

export function AddExpenseCategoryButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <IconPlus className="-ml-1.5" />
          支出カテゴリーを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>支出カテゴリーの追加</DialogTitle>
        </DialogHeader>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createCategory } from "../_actions/create-category";
import { CategoryForm, FormValues } from "./category-form";

export function AddIncomeCategoryButton() {
  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await createCategory({
        ...values,
        type: "income",
      });
      console.log("Category created:", result);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="-ml-1.5" />
          収入カテゴリーを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>収入カテゴリーの追加</DialogTitle>
        </DialogHeader>
        <CategoryForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeepReadonly } from "@/types";

import { createCategory } from "../_actions/create-category";
import { CategoryForm, FormValues } from "./category-form";

type Props = DeepReadonly<{
  type: "income" | "expense";
}>;

export function AddCategoryButton({ type }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: DeepReadonly<FormValues>) => {
    try {
      const result = await createCategory({
        ...values,
        type,
      });
      console.log("Category created:", result);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="-ml-1.5" />
          {type === "income" ? "収入" : "支出"}カテゴリーを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "income" ? "収入" : "支出"}カテゴリーの追加
          </DialogTitle>
        </DialogHeader>
        <CategoryForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

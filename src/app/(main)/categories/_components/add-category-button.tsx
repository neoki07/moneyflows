"use client";

import { IconPlus } from "@tabler/icons-react";
import { startTransition, useActionState, useState } from "react";

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
  const [state, formAction, isPending] = useActionState(createCategory, {
    success: false,
  });

  const handleSubmit = (values: FormValues) => {
    startTransition(() => {
      formAction({
        ...values,
        type,
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending}>
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
        <CategoryForm
          onSubmit={handleSubmit}
          error={state.errorMessage}
          disabled={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { IconPlus } from "@tabler/icons-react";
import { useActionState, useState } from "react";
import React from "react";

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
import { CategoryForm } from "./category-form";

type Props = DeepReadonly<{
  type: "income" | "expense";
}>;

export function AddCategoryButton({ type }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createCategory,
    undefined,
  );

  const handleAction = (formData: FormData) => {
    formData.set("type", type);
    return formAction(formData);
  };

  React.useEffect(() => {
    if (state?.status === "success") {
      setOpen(false);
    }
  }, [state]);

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
          action={handleAction}
          disabled={isPending}
          lastResult={state}
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { IconEdit } from "@tabler/icons-react";
import { useActionState, useState } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeepReadonly } from "@/types";

import { updateCategory } from "../_actions/update-category";
import { CategoryForm } from "./category-form";

type EditCategoryButtonProps = DeepReadonly<{
  category: {
    id: string;
    name: string;
    type: "income" | "expense";
  };
}>;

export function EditCategoryButton({ category }: EditCategoryButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    updateCategory,
    undefined,
  );

  React.useEffect(() => {
    if (state?.status === "success") {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <IconEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>カテゴリーの編集</DialogTitle>
          <DialogDescription>カテゴリー名を変更できます。</DialogDescription>
        </DialogHeader>
        <CategoryForm
          action={formAction}
          defaultValues={category}
          disabled={isPending}
          lastResult={state}
        />
      </DialogContent>
    </Dialog>
  );
}

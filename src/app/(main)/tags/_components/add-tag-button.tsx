"use client";

import { IconPlus } from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createTag } from "../_actions/create-tag";
import { TagForm } from "./tag-form";

export function AddTagButton() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createTag, undefined);

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
          タグを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タグの追加</DialogTitle>
        </DialogHeader>
        <TagForm action={formAction} lastResult={state} />
      </DialogContent>
    </Dialog>
  );
}

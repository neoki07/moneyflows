"use client";
import { IconEdit } from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeepReadonly } from "@/types";

import { updateTag } from "../_actions/update-tag";
import { TagForm } from "./tag-form";

type EditTagButtonProps = DeepReadonly<{
  tag: {
    id: string;
    name: string;
  };
}>;

export function EditTagButton({ tag }: EditTagButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(updateTag, undefined);

  React.useEffect(() => {
    if (state?.status === "success") {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <IconEdit />
          <span className="sr-only">編集</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タグの編集</DialogTitle>
        </DialogHeader>
        <TagForm action={formAction} defaultValues={tag} lastResult={state} />
      </DialogContent>
    </Dialog>
  );
}

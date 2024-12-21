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
import { TagForm } from "./tag-form";

export function AddTagButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="-ml-1.5" />
          タグを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タグの追加</DialogTitle>
        </DialogHeader>
        <TagForm />
      </DialogContent>
    </Dialog>
  );
}

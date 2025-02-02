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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

import { deleteTag } from "../_actions/delete-tag";
import { Tag } from "../_lib/types";

type DeleteTagButtonProps = DeepReadonly<{
  tag: Tag;
}>;

export function DeleteTagButton({ tag }: DeleteTagButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTag(tag.id);
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to delete tag:", error);
      }
    });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-50 hover:text-red-500"
        onClick={() => setIsOpen(true)}
      >
        <IconTrashX />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>タグを削除</AlertDialogTitle>
            <AlertDialogDescription>
              「{tag.name}」を削除してもよろしいですか？
              <br />
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={isPending}>
                キャンセル
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleDelete}
              >
                {isPending ? "削除中..." : "削除"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

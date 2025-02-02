import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useActionState, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeepReadonly } from "@/types";

import { deleteTransaction } from "../../../_actions/delete-transaction";
import { updateTransaction } from "../../../_actions/update-transaction";
import { Transaction } from "../../../_lib/types";
import { TransactionForm } from "../../transaction-form";
import { DeleteTransactionDialog } from "./delete-transaction-dialog";

type RowActionsProps = DeepReadonly<{
  transaction: Transaction;
}>;

export function RowActions({ transaction }: RowActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [state, formAction, isEditPending] = useActionState(
    updateTransaction,
    undefined,
  );
  const [isDeletePending, startDeleteTransition] = useTransition();

  const isPending = isEditPending || isDeletePending;

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteTransaction(transaction.id);
      setIsDeleteDialogOpen(false);
    });
  };

  React.useEffect(() => {
    if (state?.status === "success") {
      setIsEditDialogOpen(false);
    }
  }, [state]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <IconDots className="h-4 w-4" />
            <span className="sr-only">アクション</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <IconEdit />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-50 focus:text-red-500"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <IconTrash />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {transaction.type === "income" ? "収入" : "支出"}を編集
            </DialogTitle>
          </DialogHeader>
          <TransactionForm
            action={formAction}
            type={transaction.type}
            defaultValues={{
              id: transaction.id,
              date: transaction.date,
              description: transaction.description,
              amount: transaction.amount,
              category: transaction.category?.id,
              tags: transaction.tags.map((tag) => tag.id),
            }}
          />
        </DialogContent>
      </Dialog>
      <DeleteTransactionDialog
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeletePending}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        transaction={transaction}
      />
    </>
  );
}

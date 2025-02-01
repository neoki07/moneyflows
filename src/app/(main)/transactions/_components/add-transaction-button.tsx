"use client";

import { IconPlus } from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

import { createTransaction } from "@/app/(main)/transactions/_actions/create-transaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TransactionForm } from "./transaction-form";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createTransaction,
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
        <Button disabled={isPending}>
          <IconPlus className="-ml-1.5" />
          収支を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>収支の追加</DialogTitle>
        </DialogHeader>
        <TransactionForm action={formAction} />
      </DialogContent>
    </Dialog>
  );
}

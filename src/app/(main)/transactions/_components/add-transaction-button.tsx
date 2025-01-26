"use client";

import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import { createTransaction } from "@/app/(main)/transactions/_actions/create-transaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { FormValues } from "./transaction-form";
import { TransactionForm } from "./transaction-form";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    const transaction = {
      ...values,
      amount: Number(values.amount),
      category: values.category || null,
    };

    try {
      const result = await createTransaction(transaction);
      console.log("Transaction created:", result);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="-ml-1.5" />
          収支を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>収支の追加</DialogTitle>
        </DialogHeader>
        <TransactionForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

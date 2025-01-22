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
import { TransactionForm } from "./transaction-form";

export function AddTransactionButton() {
  return (
    <Dialog>
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
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
}

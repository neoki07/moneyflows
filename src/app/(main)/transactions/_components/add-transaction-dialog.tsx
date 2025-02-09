import React, { useActionState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createTransaction } from "../_actions/create-transaction";
import { TransactionForm } from "./transaction-form";

type AddTransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "income" | "expense";
};

export const AddTransactionDialog = ({
  open,
  onOpenChange,
  type,
}: AddTransactionDialogProps) => {
  const [state, formAction] = useActionState(createTransaction, undefined);

  React.useEffect(() => {
    if (state?.status === "success") {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  const handleAction = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "income" ? "収入を追加" : "支出を追加"}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm action={handleAction} type={type} />
      </DialogContent>
    </Dialog>
  );
};

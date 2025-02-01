"use client";

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconPlus,
} from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

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

import { createTransaction } from "../_actions/create-transaction";
import { TransactionForm } from "./transaction-form";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");

  const [state, formAction] = useActionState(createTransaction, undefined);

  React.useEffect(() => {
    if (state?.status === "success") {
      setOpen(false);
    }
  }, [state]);

  const handleSelect = (selectedType: "income" | "expense") => {
    setType(selectedType);
    setOpen(true);
  };

  const handleAction = (formData: FormData) => {
    formData.set("type", type);
    return formAction(formData);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <IconPlus className="-ml-1.5" />
            収支を追加
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSelect("income")}>
            <IconArrowUpRight className="h-4 w-4" />
            収入を追加
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("expense")}>
            <IconArrowDownRight className="h-4 w-4" />
            支出を追加
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type === "income" ? "収入" : "支出"}を追加
            </DialogTitle>
          </DialogHeader>
          {type && <TransactionForm action={handleAction} type={type} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

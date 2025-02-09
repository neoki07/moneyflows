"use client";

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconPlus,
  IconUpload,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createTransaction } from "../_actions/create-transaction";
import { ImportFromZaimDialog } from "./import-from-zaim-dialog";
import { TransactionForm } from "./transaction-form";

export function AddTransactionButton() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportFromZaimDialogOpen, setIsImportFromZaimDialogOpen] =
    useState(false);
  const [type, setType] = useState<"income" | "expense">("income");

  const [state, formAction] = useActionState(createTransaction, undefined);

  React.useEffect(() => {
    if (state?.status === "success") {
      setIsAddDialogOpen(false);
    }
  }, [state]);

  const handleSelect = (selectedType: "income" | "expense") => {
    setType(selectedType);
    setIsAddDialogOpen(true);
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
            <IconArrowUpRight />
            収入を追加
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("expense")}>
            <IconArrowDownRight />
            支出を追加
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsImportFromZaimDialogOpen(true)}>
            <IconUpload />
            ZaimのCSVから取り込み
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type === "income" ? "収入" : "支出"}を追加
            </DialogTitle>
          </DialogHeader>
          {type && <TransactionForm action={handleAction} type={type} />}
        </DialogContent>
      </Dialog>
      <ImportFromZaimDialog
        open={isImportFromZaimDialogOpen}
        onOpenChange={setIsImportFromZaimDialogOpen}
      />
    </>
  );
}

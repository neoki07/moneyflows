"use client";

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconPlus,
  IconUpload,
} from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AddTransactionDialog } from "./add-transaction-dialog";
import { ImportFromZaimDialog } from "./import-from-zaim-dialog";

export function AddTransactionButton() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportFromZaimDialogOpen, setIsImportFromZaimDialogOpen] =
    useState(false);
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSelect = (selectedType: "income" | "expense") => {
    setType(selectedType);
    setIsAddDialogOpen(true);
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

      <AddTransactionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        type={type}
      />
      <ImportFromZaimDialog
        open={isImportFromZaimDialogOpen}
        onOpenChange={setIsImportFromZaimDialogOpen}
      />
    </>
  );
}

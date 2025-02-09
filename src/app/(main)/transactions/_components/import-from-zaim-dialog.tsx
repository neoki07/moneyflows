import React, { useActionState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { importFromZaim } from "../_actions/import-from-zaim";
import { ImportFromZaimForm } from "./import-from-zaim-form";

type ImportFromZaimDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ImportFromZaimDialog = ({
  open,
  onOpenChange,
}: ImportFromZaimDialogProps) => {
  const [state, action] = useActionState(importFromZaim, undefined);

  React.useEffect(() => {
    if (state?.status === "success") {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ZaimのCSVから取り込み</DialogTitle>
          <DialogDescription>
            ZaimからエクスポートしたCSVファイルを選択してください。
          </DialogDescription>
        </DialogHeader>
        <ImportFromZaimForm action={action} />
      </DialogContent>
    </Dialog>
  );
};

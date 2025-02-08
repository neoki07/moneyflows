"use client";

import { IconPlus } from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createDashboard } from "../actions/create-dashboard";
import { CreateDashboardForm } from "./create-dashboard-form";

export function CreateDashboardButton() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createDashboard,
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
        <button
          className="flex h-4 w-4 cursor-pointer items-center justify-center text-slate-500 hover:text-slate-700"
          disabled={isPending}
        >
          <IconPlus size={16} />
          <span className="sr-only">ダッシュボードを作成</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ダッシュボードの作成</DialogTitle>
        </DialogHeader>
        <CreateDashboardForm
          action={formAction}
          lastResult={state}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

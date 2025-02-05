"use client";

import { IconPlus } from "@tabler/icons-react";
import React, { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <IconPlus size={16} />
            <span className="sr-only">ダッシュボードを作成</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ダッシュボードの作成</DialogTitle>
          </DialogHeader>
          <CreateDashboardForm action={formAction} lastResult={state} />
        </DialogContent>
      </Dialog>
    </>
  );
}

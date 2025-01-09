"use client";

import { Separator } from "@/components/ui/separator";
import { useDashboardStore } from "../_stores/use-dashboard-store";
import { EditDashboardForm } from "./edit-dashboard-form";
import { EditWidgetForm } from "./edit-widget-form";

export function EditDashboardPanel() {
  const { isEditing } = useDashboardStore();

  if (!isEditing) {
    return null;
  }

  return (
    <div className="w-80 min-h-screen border-l py-8 space-y-3">
      <h2 className="font-bold text-lg px-4">ダッシュボードの編集</h2>
      <div className="space-y-5">
        <div className="px-4">
          <EditDashboardForm />
        </div>
        <Separator />
        <div className="space-y-3">
          <h3 className="font-bold text-base px-4">
            選択されたウィジェットの編集
          </h3>
          <div className="px-4">
            <EditWidgetForm />
          </div>
        </div>
      </div>
    </div>
  );
}

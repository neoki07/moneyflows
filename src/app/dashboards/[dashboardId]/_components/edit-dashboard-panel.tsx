"use client";

import { useDashboardStore } from "../_stores/use-dashboard-store";

export function EditDashboardPanel() {
  const { isEditing } = useDashboardStore();

  if (!isEditing) {
    return null;
  }

  return (
    <div className="w-80 min-h-screen border-l py-8">
      <div className="px-4">
        <h2 className="font-bold text-lg">ダッシュボードの編集</h2>
      </div>
    </div>
  );
}

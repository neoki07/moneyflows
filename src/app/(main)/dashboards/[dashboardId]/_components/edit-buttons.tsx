"use client";

import { Button } from "@/components/ui/button";
import { IconEdit } from "@tabler/icons-react";
import { useDashboardStore } from "../_stores/use-dashboard-store";

export function EditButtons() {
  const { isEditing, startEditing, endEditing } = useDashboardStore();

  const edit = () => {
    startEditing();
  };

  const cancel = () => {
    endEditing();
  };

  const save = () => {
    endEditing();
  };

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={cancel}>
          キャンセル
        </Button>
        <Button onClick={save}>変更を保存</Button>
      </div>
    );
  }

  return (
    <Button onClick={edit}>
      <IconEdit className="-ml-1" />
      ダッシュボードを編集
    </Button>
  );
}

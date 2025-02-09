import { IconEdit } from "@tabler/icons-react";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";

import { getDashboard } from "../_actions/get-dashboard";
import { useDashboardStore } from "../_stores/use-dashboard-store";

type EditButtonsProps = {
  dashboard: Awaited<ReturnType<typeof getDashboard>>;
  disabled?: boolean;
};

export function EditButtons({ dashboard, disabled }: EditButtonsProps) {
  const { isEditing, startEditing, cancelEditing, save } = useDashboardStore();

  const handleSave = async () => {
    await save();
    mutate(["dashboard", dashboard.id]);
  };

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={cancelEditing}>
          キャンセル
        </Button>
        <Button onClick={handleSave}>変更を保存</Button>
      </div>
    );
  }

  return (
    <Button disabled={disabled} onClick={() => startEditing(dashboard)}>
      <IconEdit className="-ml-1" />
      ダッシュボードを編集
    </Button>
  );
}

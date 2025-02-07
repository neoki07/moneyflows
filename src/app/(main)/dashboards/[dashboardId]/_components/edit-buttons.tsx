import { IconEdit } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { useDashboardStore } from "../_stores/use-dashboard-store";

type EditButtonsProps = {
  disabled?: boolean;
};

export function EditButtons({ disabled }: EditButtonsProps) {
  const { isEditing, startEditing, cancelEditing, save } = useDashboardStore();

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={cancelEditing}>
          キャンセル
        </Button>
        <Button onClick={save}>変更を保存</Button>
      </div>
    );
  }

  return (
    <Button disabled={disabled} onClick={startEditing}>
      <IconEdit className="-ml-1" />
      ダッシュボードを編集
    </Button>
  );
}

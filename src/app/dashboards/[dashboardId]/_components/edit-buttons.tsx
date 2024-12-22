"use client";

import { Button } from "@/components/ui/button";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";

export function EditButtons() {
  const [isEditing, setIsEditing] = useState(false);

  const edit = () => {
    setIsEditing(true);
  };

  const cancel = () => {
    setIsEditing(false);
  };

  const save = () => {
    setIsEditing(false);
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
      <IconPencil className="-ml-1.5" />
      ダッシュボードを編集
    </Button>
  );
}

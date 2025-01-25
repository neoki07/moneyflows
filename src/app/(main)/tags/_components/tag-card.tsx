import { IconTrashX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { EditTagButton } from "./edit-tag-button";

export function TagCard() {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2 pl-4 font-medium">
      給料
      <div>
        <EditTagButton />
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-50 hover:text-red-500"
        >
          <IconTrashX />
        </Button>
      </div>
    </div>
  );
}

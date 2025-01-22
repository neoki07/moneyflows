import { Button } from "@/components/ui/button";
import { IconTrashX } from "@tabler/icons-react";
import { EditTagButton } from "./edit-tag-button";

export function TagCard() {
  return (
    <div className="border rounded-lg pl-4 p-2 font-medium flex justify-between items-center">
      給料
      <div>
        <EditTagButton />
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-500 hover:bg-red-50"
        >
          <IconTrashX />
        </Button>
      </div>
    </div>
  );
}

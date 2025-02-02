import { IconTrashX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { DeepReadonly } from "@/types";

import { Tag } from "../_lib/types";
import { EditTagButton } from "./edit-tag-button";

type TagCardProps = DeepReadonly<{
  tag: Tag;
}>;

export function TagCard({ tag }: TagCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2 pl-4 font-medium">
      {tag.name}
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

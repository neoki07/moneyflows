import { DeepReadonly } from "@/types";

import { Tag } from "../_lib/types";
import { DeleteTagButton } from "./delete-tag-button";
import { EditTagButton } from "./edit-tag-button";

type TagCardProps = DeepReadonly<{
  tag: Tag;
}>;

export function TagCard({ tag }: TagCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-2 pl-4 font-medium">
      {tag.name}
      <div>
        <EditTagButton tag={tag} />
        <DeleteTagButton tag={tag} />
      </div>
    </div>
  );
}

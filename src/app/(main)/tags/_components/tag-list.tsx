import { fetchTags } from "../_lib/fetch";
import { TagCard } from "./tag-card";

export async function TagList() {
  const tags = await fetchTags();

  return (
    <div className="grid grid-cols-3 gap-4">
      {tags.map((tag) => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

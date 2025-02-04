import { fetchTags } from "../_lib/fetch";
import { TagCard } from "./tag-card";
import { TagListEmpty } from "./tag-list-empty";

export async function TagList() {
  const tags = await fetchTags();

  if (tags.length === 0) {
    return <TagListEmpty />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {tags.map((tag) => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

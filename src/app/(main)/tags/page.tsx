import { AddTagButton } from "./_components/add-tag-button";
import { TagCard } from "./_components/tag-card";
import { fetchTags } from "./_lib/fetch";

export default async function Page() {
  const tags = await fetchTags();

  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">タグ</h1>
        <AddTagButton />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}

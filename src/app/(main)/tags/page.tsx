import { TagCard } from "./_components/tag-card";
import { AddTagButton } from "./_components/add-tag-button";

export default function Page() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">タグ</h1>
        <AddTagButton />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
      </div>
    </div>
  );
}

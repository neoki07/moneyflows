import { TagCard } from "./_components/tag-card";
import { AddTagButton } from "./_components/add-tag-button";

export default function Page() {
  return (
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem_1fr]">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-2xl flex-1">タグ</h1>
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

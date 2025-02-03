import { Suspense } from "react";

import { AddTagButton } from "./_components/add-tag-button";
import { TagList } from "./_components/tag-list";
import { TagListSkeleton } from "./_components/tag-list-skeleton";

export default function Page() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">タグ</h1>
        <AddTagButton />
      </div>
      <Suspense fallback={<TagListSkeleton />}>
        <TagList />
      </Suspense>
    </div>
  );
}

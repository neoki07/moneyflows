import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-2xl font-bold">カテゴリー</h1>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">収入</h2>
            <Button disabled>
              <IconPlus className="-ml-1.5" />
              収入カテゴリーを追加
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="bg-muted h-[50px] rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="flex-1 text-xl font-bold">支出</h2>
            <Button disabled>
              <IconPlus className="-ml-1.5" />
              支出カテゴリーを追加
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="bg-muted h-[50px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

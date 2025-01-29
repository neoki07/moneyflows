import { IconPlus } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DeepReadonly } from "@/types";

type CategoriesSkeletonProps = DeepReadonly<{
  type: "income" | "expense";
}>;

export function CategoriesSkeleton({ type }: CategoriesSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="flex-1 text-xl font-bold">
          {type === "income" ? "収入" : "支出"}
        </h2>
        <Button disabled>
          <IconPlus className="-ml-1.5" />
          {type === "income" ? "収入" : "支出"}カテゴリーを追加
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="bg-muted h-[50px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactionsCardSkeleton() {
  return (
    <div className="col-span-4 space-y-6 rounded-lg border p-6">
      <h2 className="text-xl font-bold">最近の収支</h2>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && <Separator className="mb-4" />}
            <ul className="space-y-2">
              <div className="py-1.5">
                <Skeleton className="h-3.5 w-24" />
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[15rem_1fr_6rem] items-center"
                >
                  <span>
                    <Skeleton className="h-3.5 w-32" />
                  </span>
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5.5 w-12 rounded-full" />
                    <Skeleton className="h-5.5 w-12 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="ml-auto h-3.5 w-16" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

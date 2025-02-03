import { Skeleton } from "@/components/ui/skeleton";

export function MonthlyExpensesCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 rounded-lg border px-4 py-3.5">
      <h2 className="text-[13px] font-semibold text-slate-700">今月の支出</h2>
      <div className="flex items-end gap-1 font-semibold">
        <span className="flex h-8 items-center">
          <Skeleton className="inline-block h-6 w-20" />
        </span>
        円
      </div>
    </div>
  );
}

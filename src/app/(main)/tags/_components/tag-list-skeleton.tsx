import { Skeleton } from "@/components/ui/skeleton";

export function TagListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="bg-muted h-[50px] rounded-lg" />
      ))}
    </div>
  );
}

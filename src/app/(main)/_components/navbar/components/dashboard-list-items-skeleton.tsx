import { Skeleton } from "@/components/ui/skeleton";

export async function DashboardListItemsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <div className="flex h-9 items-center px-3">
            <Skeleton className="h-4 w-40" />
          </div>
        </li>
      ))}
    </>
  );
}

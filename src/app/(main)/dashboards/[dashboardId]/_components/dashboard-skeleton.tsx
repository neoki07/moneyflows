import { Skeleton } from "@/components/ui/skeleton";

import { EditButtons } from "./edit-buttons";

export function DashboardSkeleton() {
  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-40" />
          <div className="ml-auto">
            <EditButtons disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

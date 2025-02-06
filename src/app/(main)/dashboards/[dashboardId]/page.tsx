import { Suspense } from "react";

import { DashboardName } from "./_components/dashboard-name";
import { DashboardNameSkeleton } from "./_components/dashboard-name-skeleton";
import { EditButtons } from "./_components/edit-buttons";
import { EditDashboardPanel } from "./_components/edit-dashboard-panel";
import { Widgets } from "./_components/widgets";

type PageProps = {
  params: Promise<{ dashboardId: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center gap-4">
          <Suspense fallback={<DashboardNameSkeleton />}>
            <DashboardName params={params} />
          </Suspense>
          <div className="ml-auto">
            <EditButtons />
          </div>
        </div>
        <Widgets />
      </div>
      <EditDashboardPanel />
    </div>
  );
}

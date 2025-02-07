import { Suspense } from "react";

import { Dashboard } from "./_components/dashboard/container";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

type PageProps = {
  params: Promise<{ dashboardId: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard params={params} />
    </Suspense>
  );
}

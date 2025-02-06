import { getDashboard } from "../_actions/get-dashboard";

export async function DashboardName({
  params,
}: {
  params: Promise<{ dashboardId: string }>;
}) {
  const { dashboardId } = await params;
  const dashboard = await getDashboard(dashboardId);

  return <h1 className="text-2xl font-bold">{dashboard.name}</h1>;
}

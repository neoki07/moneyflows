import { getDashboard } from "../../_actions/get-dashboard";
import { DashboardPresenter } from "./presentation";

type ContainerProps = {
  params: Promise<{ dashboardId: string }>;
};

export async function Dashboard({ params }: ContainerProps) {
  const { dashboardId } = await params;
  const dashboard = await getDashboard(dashboardId);

  return <DashboardPresenter dashboard={dashboard} />;
}

import { getDashboard } from "../../_actions/get-dashboard";
import { WidgetListEmpty } from "./components/widget-list-empty";
import { WidgetListPresenter } from "./presentation";

type WidgetListProps = {
  params: Promise<{ dashboardId: string }>;
};

export async function WidgetList({ params }: WidgetListProps) {
  const { dashboardId } = await params;
  const { widgets } = await getDashboard(dashboardId);

  if (widgets.length === 0) {
    return <WidgetListEmpty />;
  }

  return <WidgetListPresenter widgets={widgets} />;
}

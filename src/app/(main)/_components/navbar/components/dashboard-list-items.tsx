import { getDashboards } from "../actions/get-dashboards";
import { DashboardListEmpty } from "./dashboard-list-empty";
import { DashboardListItem } from "./dashboard-list-item";

export async function DashboardListItems() {
  const dashboards = await getDashboards();

  if (dashboards.length === 0) {
    return <DashboardListEmpty />;
  }

  return (
    <>
      {dashboards.map((dashboard) => (
        <DashboardListItem
          key={dashboard.id}
          id={dashboard.id}
          name={dashboard.name}
        />
      ))}
    </>
  );
}

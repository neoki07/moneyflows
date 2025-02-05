import { getDashboards } from "../actions/get-dashboards";
import { DashboardListItem } from "./dashboard-list-item";

export async function DashboardListItems() {
  const dashboards = await getDashboards();

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

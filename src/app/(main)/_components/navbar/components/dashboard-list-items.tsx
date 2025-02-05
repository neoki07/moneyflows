import { getDashboards } from "../actions/get-dashboards";
import { NavItem } from "./nav-item";

export async function DashboardListItems() {
  const dashboards = await getDashboards();

  return (
    <>
      {dashboards.map((dashboard) => (
        <li key={dashboard.id}>
          <NavItem link={`/dashboards/${dashboard.id}`}>
            {dashboard.name}
          </NavItem>
        </li>
      ))}
    </>
  );
}

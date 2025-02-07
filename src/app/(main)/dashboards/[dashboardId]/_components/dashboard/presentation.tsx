"use client";

import { getDashboard } from "../../_actions/get-dashboard";
import { useDashboardStore } from "../../_stores/use-dashboard-store";
import { EditButtons } from "../edit-buttons";
import { EditDashboardPanel } from "../edit-dashboard-panel";
import { WidgetList } from "../widget-list";
import { WidgetListEmpty } from "../widget-list-empty";

type PresentationProps = {
  dashboard: Awaited<ReturnType<typeof getDashboard>>;
};

export function DashboardPresenter({ dashboard }: PresentationProps) {
  const { isEditing } = useDashboardStore();

  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{dashboard.name}</h1>
          <div className="ml-auto">
            <EditButtons />
          </div>
        </div>
        {dashboard.widgets.length > 0 ? (
          <WidgetList widgets={dashboard.widgets} />
        ) : (
          <WidgetListEmpty />
        )}
      </div>
      {isEditing && <EditDashboardPanel />}
    </div>
  );
}

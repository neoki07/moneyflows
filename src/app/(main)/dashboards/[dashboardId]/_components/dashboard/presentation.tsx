"use client";

import { useEffect } from "react";

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
  const { isEditing, setDashboard, draft } = useDashboardStore();

  useEffect(() => {
    setDashboard(dashboard);
  }, [dashboard, setDashboard]);

  const displayData = isEditing ? (draft ?? dashboard) : dashboard;

  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{displayData.name}</h1>
          <div className="ml-auto">
            <EditButtons />
          </div>
        </div>
        {displayData.widgets.length > 0 ? (
          <WidgetList widgets={displayData.widgets} />
        ) : (
          <WidgetListEmpty />
        )}
      </div>
      {isEditing && <EditDashboardPanel />}
    </div>
  );
}

"use client";

import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/month-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { getDashboard } from "../../_actions/get-dashboard";
import { useDashboardStore } from "../../_stores/use-dashboard-store";
import { useDateStore } from "../../_stores/use-date-store";
import { useWidgetPropsStore } from "../../_stores/use-widget-props-store";
import { EditButtons } from "../edit-buttons";
import { EditDashboardPanel } from "../edit-dashboard-panel";
import { WidgetList } from "../widget-list";

type PresentationProps = {
  dashboard: Awaited<ReturnType<typeof getDashboard>>;
};

export function DashboardPresenter({ dashboard }: PresentationProps) {
  const { isEditing, draft } = useDashboardStore();
  const { date, setDate } = useDateStore();
  const { setWidgetProps } = useWidgetPropsStore();

  const displayName = isEditing
    ? (draft?.name ?? dashboard.name)
    : dashboard.name;

  React.useEffect(() => {
    dashboard.widgets.forEach((widget) => {
      const _widget = widget as { id: string; content: string };
      const { props } = JSON.parse(_widget.content) as { props: object };
      setWidgetProps(_widget.id, props);
    });
  }, [dashboard.widgets, setWidgetProps]);

  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-60 justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <IconCalendar className="text-muted-foreground mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy年M月") : <span>月を選択</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <MonthPicker selectedMonth={date} onMonthSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
          <EditButtons dashboard={dashboard} />
        </div>
        <WidgetList widgets={dashboard.widgets} />
      </div>
      {isEditing && <EditDashboardPanel />}
    </div>
  );
}

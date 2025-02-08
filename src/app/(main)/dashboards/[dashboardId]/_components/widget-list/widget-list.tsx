"use client";

import "gridstack/dist/gridstack-extra.css";
import "gridstack/dist/gridstack.css";

import { GridStackOptions, GridStackWidget } from "gridstack";
import { ComponentProps } from "react";
import { useEffect } from "react";

import {
  ComponentDataType,
  ComponentMap,
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "@/lib/gridstack";
import { useGridStackContext } from "@/lib/gridstack";

import { useDashboardStore } from "../../_stores/use-dashboard-store";
import { WidgetAddBar } from "../widget-add-bar";
import { BalanceChart } from "../widgets/charts/balance-chart";

const CELL_HEIGHT = 128;

const COMPONENT_MAP: ComponentMap = {
  BalanceChart,
};

const defaultGridOptions: GridStackOptions = {
  acceptWidgets: true,
  columnOpts: {
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 8,
  cellHeight: CELL_HEIGHT,
  resizable: {
    handles: "all",
  },
  children: [
    {
      id: "balance-chart",
      h: 3,
      w: 12,
      x: 0,
      y: 0,
      content: JSON.stringify({
        name: "BalanceChart",
        props: {},
      } satisfies ComponentDataType<ComponentProps<typeof BalanceChart>>),
    },
  ],
};

type WidgetListProps = {
  widgets: unknown[];
};

export function WidgetList({ widgets }: WidgetListProps) {
  const { isEditing } = useDashboardStore();

  if (isEditing) {
    return <EditableWidgetList widgets={widgets} />;
  }

  return <StaticWidgetList widgets={widgets} />;
}

function EditableWidgetList({ widgets }: WidgetListProps) {
  const options: GridStackOptions = {
    ...defaultGridOptions,
    children: widgets as GridStackWidget[],
  };

  return (
    <GridStackProvider initialOptions={options}>
      <GridStackRenderProvider>
        <EditableGridStackContent />
      </GridStackRenderProvider>
    </GridStackProvider>
  );
}

function StaticWidgetList({ widgets }: WidgetListProps) {
  const options: GridStackOptions = {
    ...defaultGridOptions,
    children: widgets as GridStackWidget[],
    staticGrid: true,
  };

  return (
    <GridStackProvider initialOptions={options}>
      <GridStackRenderProvider>
        <StaticGridStackContent />
      </GridStackRenderProvider>
    </GridStackProvider>
  );
}

function EditableGridStackContent() {
  const { saveOptions } = useGridStackContext();
  const { setGetCurrentLayout } = useDashboardStore();

  useEffect(() => {
    setGetCurrentLayout(() => saveOptions() as GridStackWidget[]);
  }, [setGetCurrentLayout, saveOptions]);

  return (
    <>
      <div className="h-full">
        <GridStackRender componentMap={COMPONENT_MAP} />
      </div>
      <WidgetAddBar />
    </>
  );
}

function StaticGridStackContent() {
  return (
    <div className="h-full">
      <GridStackRender componentMap={COMPONENT_MAP} />
    </div>
  );
}

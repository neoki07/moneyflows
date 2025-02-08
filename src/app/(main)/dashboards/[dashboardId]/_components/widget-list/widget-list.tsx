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

  const options: GridStackOptions = {
    ...defaultGridOptions,
    children: widgets as GridStackWidget[],
    staticGrid: !isEditing,
  };

  return (
    <GridStackProvider initialOptions={options}>
      <GridStackContent />
    </GridStackProvider>
  );
}

function GridStackContent() {
  const { addWidget, saveOptions } = useGridStackContext();
  const { setGetCurrentLayout } = useDashboardStore();

  useEffect(() => {
    setGetCurrentLayout(() => saveOptions() as GridStackWidget[]);
  }, [setGetCurrentLayout, saveOptions]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("widget/type");

    // グリッドの相対位置を計算
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // セルサイズに基づいて位置を計算
    const cellWidth = rect.width / 12; // 12カラム
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / CELL_HEIGHT);

    // ウィジェットを追加
    addWidget(() => {
      const baseWidget = {
        h: 3,
        x: cellX,
        y: cellY,
      };

      if (widgetType === "balance-chart") {
        return {
          ...baseWidget,
          w: 12,
          content: JSON.stringify({
            name: "BalanceChart",
            props: {},
          } satisfies ComponentDataType<ComponentProps<typeof BalanceChart>>),
        };
      }

      throw new Error(`Unknown widget type: ${widgetType}`);
    });
  };

  return (
    <GridStackRenderProvider>
      <div
        className="h-full"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <GridStackRender componentMap={COMPONENT_MAP} />
      </div>
      <WidgetAddBar />
    </GridStackRenderProvider>
  );
}

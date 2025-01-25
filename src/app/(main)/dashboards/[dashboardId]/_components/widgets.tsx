"use client";

import { ComponentProps } from "react";
import { GridStackOptions } from "gridstack";
import {
  ComponentDataType,
  ComponentMap,
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "@/lib/gridstack";
import { useDashboardStore } from "../_stores/use-dashboard-store";
import { useGridStackContext } from "@/lib/gridstack";

import "gridstack/dist/gridstack-extra.css";
import "gridstack/dist/gridstack.css";
import { BalanceChart } from "./widgets/charts/balance-chart";
import { WidgetAddBar } from "./widget-add-bar";

const CELL_HEIGHT = 128;

function BaseWidget({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col space-y-6 rounded-lg border bg-white p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex-1 rounded-lg bg-slate-100">{children}</div>
    </div>
  );
}

const COMPONENT_MAP: ComponentMap = {
  BaseWidget,
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
    {
      id: "item1",
      h: 3,
      w: 4,
      x: 0,
      y: 0,
      content: JSON.stringify({
        name: "BaseWidget",
        props: {
          title: "ウィジェット1",
          children: "ウィジェット1のコンテンツ",
        },
      } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
    },
    {
      id: "item2",
      h: 3,
      w: 3,
      x: 4,
      y: 0,
      content: JSON.stringify({
        name: "BaseWidget",
        props: {
          title: "ウィジェット2",
          children: "ウィジェット2のコンテンツ",
        },
      } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
    },
    {
      id: "item3",
      h: 3,
      w: 5,
      x: 7,
      y: 0,
      content: JSON.stringify({
        name: "BaseWidget",
        props: {
          title: "ウィジェット3",
          children: "ウィジェット3のコンテンツ",
        },
      } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
    },
    {
      id: "item4",
      h: 3,
      w: 6,
      x: 0,
      y: 3,
      content: JSON.stringify({
        name: "BaseWidget",
        props: {
          title: "ウィジェット4",
          children: "ウィジェット4のコンテンツ",
        },
      } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
    },
    {
      id: "item5",
      h: 3,
      w: 6,
      x: 6,
      y: 3,
      content: JSON.stringify({
        name: "BaseWidget",
        props: {
          title: "ウィジェット5",
          children: "ウィジェット5のコンテンツ",
        },
      } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
    },
  ],
};

interface WidgetsProps {
  initialOptions?: GridStackOptions;
}

export function Widgets({ initialOptions = defaultGridOptions }: WidgetsProps) {
  const { isEditing } = useDashboardStore();

  const options: GridStackOptions = {
    ...initialOptions,
    staticGrid: !isEditing,
  };

  return (
    <GridStackProvider initialOptions={options}>
      <GridStackContent />
    </GridStackProvider>
  );
}

function GridStackContent() {
  const { addWidget } = useGridStackContext();

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
      } else {
        return {
          ...baseWidget,
          w: 4,
          content: JSON.stringify({
            name: "BaseWidget",
            props: {
              title: "新しいウィジェット",
              children: "ウィジェットのコンテンツ",
            },
          } satisfies ComponentDataType<ComponentProps<typeof BaseWidget>>),
        };
      }
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

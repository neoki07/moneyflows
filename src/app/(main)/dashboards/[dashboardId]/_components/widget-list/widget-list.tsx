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
import { useGridStackWidgetContext } from "@/lib/gridstack";

import { useDashboardStore } from "../../_stores/use-dashboard-store";
import { WidgetAddBar } from "../widget-add-bar";
import { BalanceChart } from "../widgets/charts/balance-chart";

const CELL_HEIGHT = 128;

function BaseWidget({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { widget } = useGridStackWidgetContext();
  const { removeWidget } = useGridStackContext();
  const { isEditing } = useDashboardStore();

  return (
    <div className="flex h-full flex-col space-y-6 rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {isEditing && (
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            onClick={() => {
              if (widget.id) {
                removeWidget(widget.id);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
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

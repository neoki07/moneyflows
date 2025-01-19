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

import "gridstack/dist/gridstack-extra.css";
import "gridstack/dist/gridstack.css";

const CELL_HEIGHT = 128;
const BREAKPOINTS = [
  { c: 1, w: 700 },
  { c: 3, w: 850 },
  { c: 6, w: 950 },
  { c: 8, w: 1100 },
];

function BaseWidget({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-6 space-y-6 h-full flex flex-col">
      <h2 className="font-bold text-xl">{title}</h2>
      <div className="rounded-lg bg-slate-100 flex-1">{children}</div>
    </div>
  );
}

const COMPONENT_MAP: ComponentMap = {
  BaseWidget,
};

const defaultGridOptions: GridStackOptions = {
  acceptWidgets: true,
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 8,
  cellHeight: CELL_HEIGHT,
  children: [
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
      <GridStackRenderProvider>
        <GridStackRender componentMap={COMPONENT_MAP} />
      </GridStackRenderProvider>
    </GridStackProvider>
  );
}

"use client";

import { createId } from "@paralleldrive/cuid2";
import { IconChartBar } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { ComponentDataType } from "@/lib/gridstack";
import { useGridStackContext } from "@/lib/gridstack";

import { useDashboardStore } from "../_stores/use-dashboard-store";
import { BalanceChart } from "./widgets/charts/balance-chart";

const WIDGET_TYPES = [
  {
    id: "balance-chart",
    label: "月次収支",
    icon: IconChartBar,
    defaultSize: { w: 12, h: 3 },
  },
] as const;

export function WidgetAddBar() {
  const { isEditing } = useDashboardStore();
  const { addWidget } = useGridStackContext();

  const handleAddWidget = (widgetType: (typeof WIDGET_TYPES)[number]) => {
    addWidget(() => ({
      id: createId(),
      ...widgetType.defaultSize,
      x: 0,
      // HACK: Setting y to -1 to avoid duplicate key errors in Recharts v2.
      // Recharts generates Bar component keys using the pattern `rectangle-${x}-${y}-${value}`,
      // which can cause conflicts when stacking bars at y=0.
      // This workaround can be removed once we migrate to Recharts v3 stable.
      y: -1,
      content: JSON.stringify({
        name: "BalanceChart",
        props: {},
      } satisfies ComponentDataType<ComponentProps<typeof BalanceChart>>),
    }));
  };

  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-[45%] z-50 flex items-center gap-6 rounded-xl border bg-white p-3 shadow-lg"
        >
          <p className="pl-2 text-sm font-medium text-slate-700">
            ウィジェットを追加
          </p>
          <div className="flex items-center gap-3">
            {WIDGET_TYPES.map((widget) => (
              <Button
                key={widget.id}
                variant="outline"
                size="sm"
                onClick={() => handleAddWidget(widget)}
              >
                <widget.icon className="mr-2" size={18} />
                {widget.label}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

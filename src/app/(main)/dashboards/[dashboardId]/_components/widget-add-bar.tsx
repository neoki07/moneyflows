"use client";

import { IconChartBar, IconLayoutGrid } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { useDashboardStore } from "../_stores/use-dashboard-store";

const WIDGET_TYPES = [
  {
    id: "balance-chart",
    label: "月次収支",
    icon: IconChartBar,
    description: "月ごとの収支をグラフで表示",
  },
  {
    id: "base-widget",
    label: "基本ウィジェット",
    icon: IconLayoutGrid,
    description: "カスタマイズ可能な基本ウィジェット",
  },
] as const;

export function WidgetAddBar() {
  const { isEditing } = useDashboardStore();

  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-[45%] z-50 flex w-[30rem] items-center gap-6 rounded-xl border bg-white p-3 shadow-lg"
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
                className="cursor-move"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("widget/type", widget.id);
                }}
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

"use client";

import { Button } from "@/components/ui/button";
import { IconChartBar, IconLayoutGrid } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
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
          className="fixed bottom-8 left-[45%] bg-white rounded-xl shadow-lg border p-3 flex items-center gap-6 z-50 w-[30rem]"
        >
          <p className="text-sm text-slate-700 pl-2 font-medium">
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

import { IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

import { useDashboardStore } from "../_stores/use-dashboard-store";

interface ChartWidgetCardProps {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
}

export function ChartWidgetCard({
  title,
  children,
  onRemove,
}: ChartWidgetCardProps) {
  const { isEditing } = useDashboardStore();

  return (
    <div className="relative h-full rounded-lg border bg-white p-6">
      {isEditing && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-slate-500 hover:text-slate-900"
          onClick={onRemove}
        >
          <IconX size={18} />
        </Button>
      )}
      <h2 className="absolute text-xl font-bold">{title}</h2>
      <div className="h-full">{children}</div>
    </div>
  );
}

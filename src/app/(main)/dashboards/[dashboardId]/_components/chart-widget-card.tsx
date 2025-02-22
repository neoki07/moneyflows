import { IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { useGridStackWidgetContext } from "@/lib/gridstack";
import { cn } from "@/lib/utils";

import { useDashboardStore } from "../_stores/use-dashboard-store";
import { useSelectedWidgetStore } from "../_stores/use-selected-widget-store";

type ChartWidgetCardProps = {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
};

export function ChartWidgetCard({
  title,
  children,
  onRemove,
}: ChartWidgetCardProps) {
  const { isEditing } = useDashboardStore();
  const { widget } = useGridStackWidgetContext();
  const { selectedWidgetId, setSelectedWidgetId } = useSelectedWidgetStore();

  const handleClick = () => {
    if (isEditing) {
      setSelectedWidgetId(widget.id);
    }
  };

  return (
    <div
      className={cn(
        "relative h-full rounded-lg border bg-white",
        isEditing && selectedWidgetId === widget.id && "border-[#007DFC]",
      )}
    >
      {isEditing && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-slate-500 hover:text-slate-900"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="ウィジェットを削除"
        >
          <IconX size={18} />
        </Button>
      )}
      <div
        role="button"
        className="h-full p-6"
        onClick={isEditing ? handleClick : undefined}
        aria-label={`${title}ウィジェット`}
        aria-disabled={!isEditing}
      >
        <h2 className="absolute text-xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

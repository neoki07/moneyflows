import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";
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
    <div className="border rounded-lg p-6 h-full bg-white relative">
      {isEditing && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-slate-500 hover:text-slate-900 z-10"
          onClick={onRemove}
        >
          <IconX size={18} />
        </Button>
      )}
      <h2 className="font-bold text-xl absolute">{title}</h2>
      <div className="h-full">{children}</div>
    </div>
  );
}

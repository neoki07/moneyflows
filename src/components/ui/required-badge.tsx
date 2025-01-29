import { cn } from "@/lib/utils";

type RequiredBadgeProps = {
  className?: string;
};

export function RequiredBadge({ className }: RequiredBadgeProps) {
  return (
    <span
      className={cn(
        "rounded bg-red-100 px-1.5 py-1 text-[11px] leading-none font-semibold text-red-700",
        className,
      )}
    >
      必須
    </span>
  );
}

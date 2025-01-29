import { DeepReadonly } from "@/types";

type CategoriesEmptyProps = DeepReadonly<{
  type: "income" | "expense";
}>;

export function CategoriesEmpty({ type }: CategoriesEmptyProps) {
  return (
    <div className="text-muted-foreground flex h-[116px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
      <p>
        {type === "income" ? "収入" : "支出"}
        カテゴリーがありません
      </p>
    </div>
  );
}

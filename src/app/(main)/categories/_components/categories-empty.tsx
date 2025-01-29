import { DeepReadonly } from "@/types";

type CategoriesEmptyProps = DeepReadonly<{
  type: "income" | "expense";
}>;

export function CategoriesEmpty({ type }: CategoriesEmptyProps) {
  return (
    <div className="text-muted-foreground flex flex-col items-center gap-2 rounded-lg border border-dashed p-8">
      <p>
        {type === "income" ? "収入" : "支出"}
        カテゴリーがありません
      </p>
    </div>
  );
}

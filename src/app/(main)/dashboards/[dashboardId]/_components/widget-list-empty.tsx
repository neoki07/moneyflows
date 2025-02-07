export function WidgetListEmpty() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed px-8 py-16 text-sm">
      <p className="text-lg font-semibold">ウィジェットがありません</p>
      <p className="text-sm">
        ウィジェットを追加して、ダッシュボードをカスタマイズしましょう
      </p>
    </div>
  );
}

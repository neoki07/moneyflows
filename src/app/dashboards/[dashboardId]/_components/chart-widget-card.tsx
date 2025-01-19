interface ChartWidgetCardProps {
  title: string;
  children: React.ReactNode;
}

export function ChartWidgetCard({ title, children }: ChartWidgetCardProps) {
  return (
    <div className="border rounded-lg p-6 h-full bg-white relative">
      <h2 className="font-bold text-xl absolute">{title}</h2>
      <div className="h-full">{children}</div>
    </div>
  );
}

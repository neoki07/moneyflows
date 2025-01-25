import { BalanceChartContent } from "@/app/(main)/dashboards/[dashboardId]/_components/widgets/charts/balance-chart";

export function TransitionCard() {
  return (
    <div className="space-y-6 rounded-lg border bg-white p-6">
      <h2 className="text-xl font-bold">収支推移</h2>
      <div className="h-[384px]">
        <BalanceChartContent />
      </div>
    </div>
  );
}

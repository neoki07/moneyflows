import { BalanceChartContent } from "@/app/dashboards/[dashboardId]/_components/widgets/charts/balance-chart";

export function TransitionCard() {
  return (
    <div className="border rounded-lg p-6 space-y-6 bg-white">
      <h2 className="font-bold text-xl">収支推移</h2>
      <div className="h-[384px]">
        <BalanceChartContent />
      </div>
    </div>
  );
}

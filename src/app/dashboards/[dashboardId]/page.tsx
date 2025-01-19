import { EditButtons } from "./_components/edit-buttons";
import { EditDashboardPanel } from "./_components/edit-dashboard-panel";
import { Widgets } from "./_components/widgets";

export default function Page() {
  return (
    <div className="flex">
      <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr] flex-1">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl flex-1">ダッシュボード</h1>
          <EditButtons />
        </div>
        <Widgets />
      </div>
      <EditDashboardPanel />
    </div>
  );
}

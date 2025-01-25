import { EditButtons } from "./_components/edit-buttons";
import { EditDashboardPanel } from "./_components/edit-dashboard-panel";
import { Widgets } from "./_components/widgets";

export default function Page() {
  return (
    <div className="flex">
      <div className="grid flex-1 grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 text-2xl font-bold">ダッシュボード</h1>
          <EditButtons />
        </div>
        <Widgets />
      </div>
      <EditDashboardPanel />
    </div>
  );
}

import { EditButtons } from "./_components/edit-buttons";
import { EditDashboardPanel } from "./_components/edit-dashboard-panel";

export default function Page() {
  return (
    <div className="flex">
      <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr] flex-1">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl flex-1">ダッシュボード</h1>
          <EditButtons />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="border rounded-lg p-6 col-span-4 space-y-6">
            <h2 className="font-bold text-xl">ウィジェット1</h2>
            <div className="rounded-lg bg-slate-100 h-64" />
          </div>
          <div className="border rounded-lg p-6 col-span-3 space-y-6">
            <h2 className="font-bold text-xl">ウィジェット2</h2>
            <div className="rounded-lg bg-slate-100 h-64" />
          </div>
          <div className="border rounded-lg p-6 col-span-5 space-y-6">
            <h2 className="font-bold text-xl">ウィジェット3</h2>
            <div className="rounded-lg bg-slate-100 h-64" />
          </div>
          <div className="border rounded-lg p-6 col-span-6 space-y-6">
            <h2 className="font-bold text-xl">ウィジェット4</h2>
            <div className="rounded-lg bg-slate-100 h-64" />
          </div>
          <div className="border rounded-lg p-6 col-span-6 space-y-6">
            <h2 className="font-bold text-xl">ウィジェット5</h2>
            <div className="rounded-lg bg-slate-100 h-64" />
          </div>
        </div>
      </div>
      <EditDashboardPanel />
    </div>
  );
}

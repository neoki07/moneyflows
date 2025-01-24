import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function LatestTransactionsCard() {
  return (
    <div className="border rounded-lg p-6 col-span-4 space-y-6">
      <h2 className="font-bold text-xl">最近の収支</h2>
      <div className="space-y-4">
        <ul className="space-y-2">
          <span className="text-sm text-slate-700">11月23日 (土)</span>
          <li className="grid grid-cols-[15rem_1fr_6rem] text-sm">
            <span>給料</span>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">給料</Badge>
            </div>
            <span className="text-right text-emerald-600">123円</span>
          </li>
          <li className="grid grid-cols-[15rem_1fr_6rem] text-sm">
            <span>ローソン</span>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">食費</Badge>
              <Badge variant="outline">生活費</Badge>
            </div>
            <span className="text-right text-rose-600">-123円</span>
          </li>
        </ul>
        <Separator />
        <ul className="space-y-2">
          <span className="text-sm text-slate-700">11月22日 (金)</span>
          <li className="grid grid-cols-[15rem_1fr_6rem] text-sm">
            <span>給料</span>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">給料</Badge>
            </div>
            <span className="text-right text-emerald-600">123円</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

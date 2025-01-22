export function TotalBalanceCard() {
  return (
    <div className="rounded-lg border p-4 flex flex-col gap-4">
      <h2 className="text-[13px] leading-none font-semibold text-slate-700">
        総資産
      </h2>
      <div className="font-semibold leading-none">
        <span className="text-2xl leading-none me-1">123,456</span>円
      </div>
    </div>
  );
}

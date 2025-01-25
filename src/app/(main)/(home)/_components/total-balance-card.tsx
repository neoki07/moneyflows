export function TotalBalanceCard() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-[13px] leading-none font-semibold text-slate-700">
        総資産
      </h2>
      <div className="leading-none font-semibold">
        <span className="me-1 text-2xl leading-none">123,456</span>円
      </div>
    </div>
  );
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}

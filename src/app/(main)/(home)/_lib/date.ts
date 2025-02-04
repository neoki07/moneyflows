import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function formatRecentTransactionDate(date: Date): string {
  return format(date, "M月d日 (E)", { locale: ja });
}

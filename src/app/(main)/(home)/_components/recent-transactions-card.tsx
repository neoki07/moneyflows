import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatAmount } from "@/lib/amount";
import { groupBy } from "@/lib/array";

import { formatRecentTransactionDate } from "../_lib/date";
import { fetchRecentTransactions } from "../_lib/fetch";

export async function RecentTransactionsCard() {
  const { transactions } = await fetchRecentTransactions();

  if (transactions.length === 0) {
    return (
      <div className="col-span-4 space-y-6 rounded-lg border p-6">
        <h2 className="text-xl font-bold">最近の収支</h2>
        <div className="text-muted-foreground py-8 text-center text-sm">
          収支データがありません
        </div>
      </div>
    );
  }

  const groupedTransactions = groupBy(transactions, (transaction) =>
    formatRecentTransactionDate(transaction.date),
  );

  return (
    <div className="col-span-4 space-y-6 rounded-lg border p-6">
      <h2 className="text-xl font-bold">最近の収支</h2>
      <div className="space-y-4">
        {Object.entries(groupedTransactions).map(
          ([date, dayTransactions], index) => (
            <div key={date}>
              {index > 0 && <Separator className="mb-4" />}
              <ul className="space-y-2">
                <div className="text-sm font-medium text-slate-700">{date}</div>
                {dayTransactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="grid grid-cols-[15rem_1fr_6rem] text-sm"
                  >
                    <span>{transaction.description}</span>
                    <div className="flex flex-wrap gap-1">
                      {transaction.category && (
                        <Badge variant="outline">
                          {transaction.category.name}
                        </Badge>
                      )}
                      {transaction.tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <span
                      className={
                        transaction.type === "income"
                          ? "text-right text-emerald-600"
                          : "text-right text-rose-600"
                      }
                    >
                      {transaction.type === "income" ? "" : "-"}
                      {formatAmount(transaction.amount)}円
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

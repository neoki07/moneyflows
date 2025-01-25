import { Input } from "@/components/ui/input";

import { AddTransactionButton } from "./_components/add-transaction-button";
import { TransactionTable } from "./_components/transaction-table";
import { fetchTransactionTableData } from "./_lib/fetch";

export default async function Page() {
  const { transactions, pagination } = await fetchTransactionTableData(1, 10);

  return (
    <div className="grid grid-rows-[2.25rem_1fr] gap-8 px-6 py-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">収支</h1>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Input placeholder="キーワード検索" />
          </div>
          <div>
            <AddTransactionButton />
          </div>
        </div>
        <TransactionTable
          data={transactions}
          totalCount={pagination.totalCount}
        />
      </div>
    </div>
  );
}

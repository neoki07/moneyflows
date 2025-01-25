import { Input } from "@/components/ui/input";

import { AddTransactionButton } from "./_components/add-transaction-button";
import { DataTablePagination } from "./_components/data-table-pagination";
import { fetchTransactionTableData } from "./_lib/fetch";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const { transactions } = await fetchTransactionTableData(1, 10);

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
        <DataTable columns={columns} data={transactions} />
        <DataTablePagination />
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { AddTransactionButton } from "./_components/add-transaction-button";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";
import { DataTablePagination } from "./_components/data-table-pagination";

async function getData(): Promise<Transaction[]> {
  return [
    {
      id: "728ed52a",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
    {
      id: "728ed52b",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
    {
      id: "728ed52c",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
    {
      id: "728ed52d",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
    {
      id: "728ed52e",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
    {
      id: "728ed52f",
      amount: 100,
      description: "pending",
      date: "2022/01/01 (土)",
      category: "給料",
      tag: "給料",
    },
  ];
}

export default async function Page() {
  const data = await getData();

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
        <DataTable columns={columns} data={data} />
        <DataTablePagination />
      </div>
    </div>
  );
}

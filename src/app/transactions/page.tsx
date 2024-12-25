import { AddTransactionButton } from "./_components/add-transaction-button";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";

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
    <div className="px-6 py-8 gap-8 grid grid-rows-[2.25rem,1fr]">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl">収支</h1>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div />
          <div>
            <AddTransactionButton />
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

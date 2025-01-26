import { fetchTransactionTableData } from "@/app/(main)/transactions/_lib/fetch";

import { TransactionTablePresenter } from "./presentation";

type TransactionTableProps = {
  currentPage: number;
};

export async function TransactionTable({ currentPage }: TransactionTableProps) {
  const { transactions, pagination } = await fetchTransactionTableData(
    currentPage,
    10,
  );

  return (
    <TransactionTablePresenter
      data={transactions}
      currentPage={currentPage}
      totalCount={pagination.totalCount}
    />
  );
}

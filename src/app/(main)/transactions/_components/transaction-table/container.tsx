import { fetchTransactionTableData } from "@/app/(main)/transactions/_lib/fetch";

import { TransactionTablePresenter } from "./presentation";

type TransactionTableProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function TransactionTable({
  searchParams,
}: TransactionTableProps) {
  const { page: pageString, q: query } = await searchParams;

  const page = Number.isInteger(Number(pageString)) ? Number(pageString) : 1;
  const pageSize = 10;

  const { transactions, pagination } = await fetchTransactionTableData(
    page,
    pageSize,
    typeof query === "string" ? query : undefined,
  );

  return (
    <TransactionTablePresenter
      data={transactions}
      totalCount={pagination.totalCount}
      currentPage={page}
      pageSize={pageSize}
    />
  );
}

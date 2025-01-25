import { mockTransactions } from "./mock";
import { TransactionTableData } from "./types";

export async function fetchTransactionTableData(
  page: number,
  pageSize: number,
): Promise<TransactionTableData> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    transactions: mockTransactions.slice(start, end),
    pagination: {
      totalCount: mockTransactions.length,
    },
  };
}

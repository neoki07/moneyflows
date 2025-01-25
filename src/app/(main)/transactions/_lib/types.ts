export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export interface TransactionTableData {
  transactions: Transaction[];
  pagination: {
    totalCount: number;
  };
}

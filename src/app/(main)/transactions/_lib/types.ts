import { DeepReadonly } from "@/types";

export type Transaction = DeepReadonly<{
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category: string;
  tags: string[];
}>;

export type TransactionTableData = DeepReadonly<{
  transactions: Transaction[];
  pagination: {
    totalCount: number;
  };
}>;

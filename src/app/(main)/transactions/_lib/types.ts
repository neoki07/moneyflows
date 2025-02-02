import { DeepReadonly } from "@/types";

export type Transaction = DeepReadonly<{
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: Date;
  category?: {
    id: string;
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
}>;

export type TransactionTableData = DeepReadonly<{
  transactions: Transaction[];
  pagination: {
    totalCount: number;
  };
}>;

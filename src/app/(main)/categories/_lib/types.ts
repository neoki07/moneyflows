import { DeepReadonly } from "@/types";

type BaseCategoryFields = {
  id: string;
  name: string;
};

export type IncomeCategory = DeepReadonly<
  BaseCategoryFields & {
    type: "income";
  }
>;

export type ExpenseCategory = DeepReadonly<
  BaseCategoryFields & {
    type: "expense";
  }
>;

export type Categories = {
  income: IncomeCategory[];
  expense: ExpenseCategory[];
};

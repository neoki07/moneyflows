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

export type Category = IncomeCategory | ExpenseCategory;

export type IncomeCategoriesData = DeepReadonly<{
  categories: IncomeCategory[];
}>;

export type ExpenseCategoriesData = DeepReadonly<{
  categories: ExpenseCategory[];
}>;

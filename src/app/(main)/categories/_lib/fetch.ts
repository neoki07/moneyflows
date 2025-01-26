import { mockCategories } from "./mock";
import { ExpenseCategoriesData, IncomeCategoriesData } from "./types";

export async function fetchIncomeCategoriesData(): Promise<IncomeCategoriesData> {
  const incomeCategories = mockCategories.filter(
    (category) => category.type === "income",
  );

  return {
    categories: incomeCategories,
  };
}

export async function fetchExpenseCategoriesData(): Promise<ExpenseCategoriesData> {
  const expenseCategories = mockCategories.filter(
    (category) => category.type === "expense",
  );

  return {
    categories: expenseCategories,
  };
}

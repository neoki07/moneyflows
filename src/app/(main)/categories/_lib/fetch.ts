import { db } from "@/db";
import { CategoryRecord, categoryTable } from "@/db/schema";

import { Categories, ExpenseCategory, IncomeCategory } from "./types";

function toIncomeCategory(record: CategoryRecord): IncomeCategory {
  return {
    id: record.id,
    name: record.name,
    type: "income",
  };
}

function toExpenseCategory(record: CategoryRecord): ExpenseCategory {
  return {
    id: record.id,
    name: record.name,
    type: "expense",
  };
}

type FetchCategoriesResult = {
  categories: Categories;
};

export async function fetchCategories(): Promise<FetchCategoriesResult> {
  const records = await db
    .select()
    .from(categoryTable)
    .orderBy(categoryTable.name);

  return {
    categories: {
      income: records
        .filter((record) => record.type === "income")
        .map(toIncomeCategory),
      expense: records
        .filter((record) => record.type === "expense")
        .map(toExpenseCategory),
    },
  };
}

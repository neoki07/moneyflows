import { asc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { connection } from "next/server";

import { db } from "@/db";
import { CategoryRecord, categoryTable } from "@/db/schema";

import { ExpenseCategory, IncomeCategory } from "./types";

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

export async function fetchIncomeCategories(): Promise<IncomeCategory[]> {
  await connection();

  const records = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.type, "income"))
    .orderBy(asc(categoryTable.id));

  return records.map(toIncomeCategory);
}

export async function fetchExpenseCategories(): Promise<ExpenseCategory[]> {
  await connection();

  const records = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.type, "expense"))
    .orderBy(asc(categoryTable.id));

  return records.map(toExpenseCategory);
}

import { auth } from "@clerk/nextjs/server";
import { and, asc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
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

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const records = await db
    .select()
    .from(categoryTable)
    .where(
      and(eq(categoryTable.userId, userId), eq(categoryTable.type, "income")),
    )
    .orderBy(asc(categoryTable.createdAt));

  return records.map(toIncomeCategory);
}

export async function fetchExpenseCategories(): Promise<ExpenseCategory[]> {
  await connection();

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const records = await db
    .select()
    .from(categoryTable)
    .where(
      and(eq(categoryTable.userId, userId), eq(categoryTable.type, "expense")),
    )
    .orderBy(asc(categoryTable.createdAt));

  return records.map(toExpenseCategory);
}

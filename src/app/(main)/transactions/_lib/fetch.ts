import { auth } from "@clerk/nextjs/server";
import { count, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import {
  CategoryRecord,
  categoryTable,
  TransactionRecord,
  transactionTable,
} from "@/db/schema";

import { Transaction, TransactionTableData } from "./types";

type TransactionWithCategoryRecord = Pick<
  TransactionRecord,
  "id" | "date" | "description" | "amount" | "type"
> & {
  category: Pick<CategoryRecord, "id" | "name"> | null;
};

function toTransaction(record: TransactionWithCategoryRecord): Transaction {
  return {
    id: record.id,
    type: record.type,
    amount: record.amount,
    description: record.description,
    date: record.date.toISOString().split("T")[0],
    category: record.category?.name ?? "",
    tags: [], // TODO: add tags when tag feature is implemented
  };
}

export async function fetchTransactionTableData(
  page: number,
  pageSize: number,
): Promise<TransactionTableData> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const start = (page - 1) * pageSize;

  const transactions = await db
    .select({
      id: transactionTable.id,
      date: transactionTable.date,
      description: transactionTable.description,
      amount: transactionTable.amount,
      type: transactionTable.type,
      category: {
        id: categoryTable.id,
        name: categoryTable.name,
      },
    })
    .from(transactionTable)
    .leftJoin(categoryTable, eq(transactionTable.categoryId, categoryTable.id))
    .where(eq(transactionTable.userId, userId))
    .orderBy(desc(transactionTable.date))
    .limit(pageSize)
    .offset(start);

  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId));

  return {
    transactions: transactions.map(toTransaction),
    pagination: {
      totalCount,
    },
  };
}

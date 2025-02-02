import { auth } from "@clerk/nextjs/server";
import { and, count, desc, eq, inArray } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import {
  CategoryRecord,
  categoryTable,
  TagRecord,
  tagTable,
  TransactionRecord,
  transactionTable,
  transactionTagTable,
} from "@/db/schema";

import { Transaction, TransactionTableData } from "./types";

type TransactionWithCategoryAndTagsRecord = Pick<
  TransactionRecord,
  "id" | "date" | "description" | "amount" | "type"
> & {
  category: Pick<CategoryRecord, "id" | "name"> | null;
} & {
  tags: (Pick<TagRecord, "id" | "name"> & {
    transactionId: string;
  })[];
};

function toTransaction(
  record: TransactionWithCategoryAndTagsRecord,
): Transaction {
  return {
    id: record.id,
    type: record.type,
    amount: record.amount,
    description: record.description,
    date: record.date,
    category: record.category ?? undefined,
    tags: record.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
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

  const tags = await db
    .select({
      id: tagTable.id,
      name: tagTable.name,
      transactionId: transactionTagTable.transactionId,
    })
    .from(tagTable)
    .innerJoin(transactionTagTable, eq(transactionTagTable.tagId, tagTable.id))
    .where(
      and(
        eq(tagTable.userId, userId),
        inArray(
          transactionTagTable.transactionId,
          transactions.map((t) => t.id),
        ),
      ),
    );

  const transactionsWithTags = transactions.map((transaction) => ({
    ...transaction,
    tags: tags.filter((tag) => tag.transactionId === transaction.id),
  }));

  const [{ totalCount }] = await db
    .select({ totalCount: count() })
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId));

  return {
    transactions: transactionsWithTags.map(toTransaction),
    pagination: {
      totalCount,
    },
  };
}

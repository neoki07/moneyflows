import { auth } from "@clerk/nextjs/server";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import {
  categoryTable,
  tagTable,
  transactionTable,
  transactionTagTable,
} from "@/db/schema";
import { groupBy } from "@/lib/array";

type TotalBalance = {
  totalBalance: number;
};

export async function fetchTotalBalance(): Promise<TotalBalance> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const [result] = await db
    .select({
      totalBalance: sql<number>`sum(case when type = 'income' then amount else -amount end)`,
    })
    .from(transactionTable)
    .where(eq(transactionTable.userId, userId));

  return {
    totalBalance: result.totalBalance ?? 0,
  };
}

type MonthlyIncome = {
  monthlyIncome: number;
};

export async function fetchMonthlyIncome(): Promise<MonthlyIncome> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const now = new Date();
  const [result] = await db
    .select({
      monthlyIncome: sql<number>`sum(amount)`,
    })
    .from(transactionTable)
    .where(
      and(
        eq(transactionTable.userId, userId),
        eq(transactionTable.type, "income"),
        sql`date >= ${format(startOfMonth(now), "yyyy-MM-dd")} and date <= ${format(
          endOfMonth(now),
          "yyyy-MM-dd",
        )}`,
      ),
    );

  return {
    monthlyIncome: result.monthlyIncome ?? 0,
  };
}

type MonthlyExpense = {
  monthlyExpense: number;
};

export async function fetchMonthlyExpense(): Promise<MonthlyExpense> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const now = new Date();
  const [result] = await db
    .select({
      monthlyExpense: sql<number>`sum(amount)`,
    })
    .from(transactionTable)
    .where(
      and(
        eq(transactionTable.userId, userId),
        eq(transactionTable.type, "expense"),
        sql`date >= ${format(startOfMonth(now), "yyyy-MM-dd")} and date <= ${format(
          endOfMonth(now),
          "yyyy-MM-dd",
        )}`,
      ),
    );

  return {
    monthlyExpense: result.monthlyExpense ?? 0,
  };
}

type MonthlyBalance = {
  monthlyBalance: number;
};

export async function fetchMonthlyBalance(): Promise<MonthlyBalance> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const now = new Date();
  const [result] = await db
    .select({
      monthlyBalance: sql<number>`sum(case when type = 'income' then amount else -amount end)`,
    })
    .from(transactionTable)
    .where(
      and(
        eq(transactionTable.userId, userId),
        sql`date >= ${format(startOfMonth(now), "yyyy-MM-dd")} and date <= ${format(
          endOfMonth(now),
          "yyyy-MM-dd",
        )}`,
      ),
    );

  return {
    monthlyBalance: result.monthlyBalance ?? 0,
  };
}

type RecentTransaction = {
  id: string;
  date: Date;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
};

type RecentTransactions = {
  transactions: RecentTransaction[];
};

export async function fetchRecentTransactions(): Promise<RecentTransactions> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const transactions = await db
    .select({
      id: transactionTable.id,
      date: transactionTable.date,
      type: transactionTable.type,
      amount: transactionTable.amount,
      description: transactionTable.description,
      category: {
        id: categoryTable.id,
        name: categoryTable.name,
      },
    })
    .from(transactionTable)
    .leftJoin(categoryTable, eq(transactionTable.categoryId, categoryTable.id))
    .where(eq(transactionTable.userId, userId))
    .orderBy(desc(transactionTable.date), desc(transactionTable.createdAt))
    .limit(10);

  const transactionIds = transactions.map((t) => t.id);

  const tags = await db
    .select({
      transactionId: transactionTagTable.transactionId,
      id: tagTable.id,
      name: tagTable.name,
    })
    .from(transactionTagTable)
    .innerJoin(tagTable, eq(transactionTagTable.tagId, tagTable.id))
    .where(inArray(transactionTagTable.transactionId, transactionIds));

  const tagsByTransactionId = groupBy(tags, (tag) => tag.transactionId);

  return {
    transactions: transactions.map((transaction) => ({
      ...transaction,
      tags:
        tagsByTransactionId[transaction.id]?.map(({ id, name }) => ({
          id,
          name,
        })) ?? [],
    })),
  };
}

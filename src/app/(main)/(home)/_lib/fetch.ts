import { auth } from "@clerk/nextjs/server";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

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

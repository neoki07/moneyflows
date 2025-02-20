import { getAuth } from "@hono/clerk-auth";
import { and, eq, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

export const transactions = new Hono()
  .get("/monthly-balances", async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const { startMonth, endMonth } = c.req.query();
    if (!startMonth || !endMonth) {
      return c.json({ message: "開始月と終了月を指定してください" }, 400);
    }

    // YYYY-MM形式のバリデーション
    const yearMonthPattern = /^\d{4}-(?:0[1-9]|1[0-2])$/;
    if (
      !yearMonthPattern.test(startMonth) ||
      !yearMonthPattern.test(endMonth)
    ) {
      return c.json({ message: "月の形式が正しくありません（YYYY-MM）" }, 400);
    }

    const result = await db
      .select({
        month: sql`to_char(${transactionTable.date}, 'YYYY-MM')`.mapWith(
          String,
        ),
        income:
          sql`sum(case when type = 'income' then amount else 0 end)`.mapWith(
            Number,
          ),
        expense:
          sql`sum(case when type = 'expense' then amount else 0 end)`.mapWith(
            Number,
          ),
      })
      .from(transactionTable)
      .where(
        and(
          eq(transactionTable.userId, auth.userId),
          sql`${transactionTable.date} >= to_date(${startMonth}, 'YYYY-MM')`,
          sql`${transactionTable.date} < to_date(${endMonth}, 'YYYY-MM') + interval '1 month'`,
        ),
      )
      .groupBy(sql`to_char(${transactionTable.date}, 'YYYY-MM')`)
      .orderBy(desc(sql`to_char(${transactionTable.date}, 'YYYY-MM')`));

    const monthlyBalances = result
      .map((row) => {
        const balance = row.income - row.expense;
        const month = parseInt(row.month.split("-")[1]);
        return {
          month,
          income: row.income,
          expense: -row.expense,
          balance,
        };
      })
      .toReversed();

    return c.json({ monthlyBalances });
  })
  .post("/import-from-zaim", async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const body = await c.req.json();
    console.log({ body });
  });

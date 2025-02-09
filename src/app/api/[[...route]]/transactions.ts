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
          sql`${transactionTable.date} >= date_trunc('month', current_date - interval '11 months')`,
        ),
      )
      .groupBy(sql`to_char(${transactionTable.date}, 'YYYY-MM')`)
      .orderBy(desc(sql`to_char(${transactionTable.date}, 'YYYY-MM')`));

    const monthlyBalances = result.map((row) => {
      const balance = row.income - row.expense;
      const month = parseInt(row.month.split("-")[1]);
      return {
        month,
        income: row.income,
        expense: -row.expense,
        balance,
      };
    });

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

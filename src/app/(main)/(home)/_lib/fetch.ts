import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
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

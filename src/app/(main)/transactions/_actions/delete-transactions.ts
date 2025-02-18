"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

export async function deleteTransactions(ids: string[]) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await db
    .delete(transactionTable)
    .where(
      and(
        eq(transactionTable.userId, userId),
        inArray(transactionTable.id, ids),
      ),
    );

  revalidatePath("/transactions");
}

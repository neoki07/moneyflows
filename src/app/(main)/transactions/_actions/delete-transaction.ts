"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

export async function deleteTransaction(id: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await db
    .delete(transactionTable)
    .where(
      and(eq(transactionTable.userId, userId), eq(transactionTable.id, id)),
    );

  revalidatePath("/transactions");
}

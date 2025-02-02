"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { tagTable } from "@/db/schema";

export async function deleteTag(id: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  try {
    await db
      .delete(tagTable)
      .where(and(eq(tagTable.userId, userId), eq(tagTable.id, id)));

    revalidatePath("/tags");
  } catch (error) {
    console.error(error);
    throw new Error("タグの削除に失敗しました");
  }
}

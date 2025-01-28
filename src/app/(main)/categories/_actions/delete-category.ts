"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

export async function deleteCategory(id: string) {
  const [deletedCategory] = await db
    .delete(categoryTable)
    .where(eq(categoryTable.id, id))
    .returning();

  revalidatePath("/categories");

  return { category: deletedCategory };
}

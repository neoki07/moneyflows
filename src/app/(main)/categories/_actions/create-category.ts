"use server";

import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const createCategorySchema = z.object({
  name: z.string().min(1).max(20),
  type: z.enum(["income", "expense"]),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export async function createCategory(input: CreateCategoryInput) {
  const parsed = createCategorySchema.parse(input);
  const id = createId();

  const [category] = await db
    .insert(categoryTable)
    .values({ ...parsed, id })
    .returning();

  revalidatePath("/categories");

  return { category };
}

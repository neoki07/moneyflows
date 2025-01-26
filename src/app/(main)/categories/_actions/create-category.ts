"use server";

import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1).max(20),
  type: z.enum(["income", "expense"]),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export async function createCategory(input: CreateCategoryInput) {
  const parsed = createCategorySchema.parse(input);

  // TODO: Save to DB
  console.log("Creating category:", parsed);

  return {
    success: true,
  };
}

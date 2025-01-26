"use server";

import { z } from "zod";

const createTransactionSchema = z.object({
  date: z.date(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(["income", "expense"]),
  category: z.string().nullable(),
  tags: z.array(z.string()),
});

type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export async function createTransaction(input: CreateTransactionInput) {
  const parsed = createTransactionSchema.parse(input);

  // TODO: Save to DB
  console.log("Creating transaction:", parsed);

  return {
    success: true,
  };
}

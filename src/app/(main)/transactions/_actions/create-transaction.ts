"use server";

import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

const createTransactionSchema = z.object({
  date: z.date(),
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  // TODO: add transaction type
});

export async function createTransaction(
  _prevState: unknown,
  input: FormData,
): Promise<SubmissionResult> {
  const submission = parseWithZod(input, { schema: createTransactionSchema });

  // TODO: Save to DB
  console.log("Creating transaction:", input, submission);

  return { status: "success" };
}

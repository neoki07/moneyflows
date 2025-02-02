"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

const formSchema = z.object({
  id: z.string(),
  date: z.date({ required_error: "日付を入力してください" }),
  description: z.string({ required_error: "内容を入力してください" }),
  amount: z
    .number({ required_error: "金額を入力してください" })
    .min(1, { message: "金額は1以上で入力してください" }),
  category: z.string().optional(),
  tags: z.array(z.string()),
  type: z.enum(["income", "expense"]),
});

export async function updateTransaction(
  _prevState: unknown,
  input: FormData,
): Promise<SubmissionResult> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const submission = parseWithZod(input, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply({
      formErrors: ["収支の更新に失敗しました"],
    });
  }

  try {
    await db
      .update(transactionTable)
      .set({
        date: submission.value.date,
        description: submission.value.description,
        amount: submission.value.amount,
        categoryId: submission.value.category || null,
        type: submission.value.type,
      })
      .where(
        and(
          eq(transactionTable.userId, userId),
          eq(transactionTable.id, submission.value.id),
        ),
      );

    revalidatePath("/transactions");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["収支の更新に失敗しました"],
    });
  }
}

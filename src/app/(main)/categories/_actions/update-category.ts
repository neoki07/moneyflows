"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const formSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "カテゴリー名を入力してください")
    .max(20, "カテゴリー名は20文字以内で入力してください"),
});

export async function updateCategory(
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
      formErrors: ["カテゴリーの更新に失敗しました"],
    });
  }

  try {
    await db
      .update(categoryTable)
      .set({ name: submission.value.name })
      .where(
        and(
          eq(categoryTable.userId, userId),
          eq(categoryTable.id, submission.value.id),
        ),
      );

    revalidatePath("/categories");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["カテゴリーの更新に失敗しました"],
    });
  }
}

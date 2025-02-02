"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { tagTable } from "@/db/schema";

const formSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "タグ名を入力してください" })
    .min(1, "タグ名を入力してください")
    .max(20, "タグ名は20文字以内で入力してください"),
});

export async function updateTag(
  _prevState: unknown,
  input: FormData,
): Promise<SubmissionResult> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const submission = parseWithZod(input, { schema: formSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    await db
      .update(tagTable)
      .set({ name: submission.value.name })
      .where(
        and(eq(tagTable.userId, userId), eq(tagTable.id, submission.value.id)),
      );

    revalidatePath("/tags");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["タグの更新に失敗しました"],
    });
  }
}

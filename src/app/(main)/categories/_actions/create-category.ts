"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "カテゴリー名を入力してください")
    .max(20, "カテゴリー名は20文字以内で入力してください"),
  type: z.enum(["income", "expense"]),
});

export async function createCategory(
  _prevState: unknown,
  input: FormData,
): Promise<SubmissionResult> {
  const submission = parseWithZod(input, { schema: formSchema });

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  if (submission.status !== "success") {
    return submission.reply({
      formErrors: ["カテゴリーの作成に失敗しました"],
    });
  }

  try {
    const [existing] = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.name, submission.value.name))
      .limit(1);

    if (existing) {
      return submission.reply({
        fieldErrors: {
          name: ["このカテゴリー名は既に使用されています"],
        },
      });
    }

    await db.insert(categoryTable).values({
      ...submission.value,
      id: createId(),
      userId,
    });

    revalidatePath("/categories");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["カテゴリーの作成に失敗しました"],
    });
  }
}

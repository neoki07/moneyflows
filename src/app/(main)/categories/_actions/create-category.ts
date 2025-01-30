"use server";

import { parseWithZod } from "@conform-to/zod";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

export async function createCategory(_prevState: unknown, input: FormData) {
  const submission = parseWithZod(input, { schema: formSchema });

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
    });

    revalidatePath("/categories");
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["カテゴリーの作成に失敗しました"],
    });
  }
}

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
import { dashboardTable } from "@/db/schema";

const formSchema = z.object({
  name: z.string({ required_error: "ダッシュボード名を入力してください" }),
});

export async function createDashboard(
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
    const [existing] = await db
      .select()
      .from(dashboardTable)
      .where(eq(dashboardTable.name, submission.value.name))
      .limit(1);

    if (existing) {
      return submission.reply({
        fieldErrors: {
          name: ["このダッシュボード名は既に使用されています"],
        },
      });
    }

    await db.insert(dashboardTable).values({
      ...submission.value,
      id: createId(),
      userId,
    });

    revalidatePath("/");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["ダッシュボードの作成に失敗しました"],
    });
  }
}

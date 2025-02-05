"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createId } from "@paralleldrive/cuid2";
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

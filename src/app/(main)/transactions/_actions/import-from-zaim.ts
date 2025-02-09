"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Papa from "papaparse";
import { z } from "zod";

import { db } from "@/db";
import { transactionTable } from "@/db/schema";

const schema = z.object({
  file: z.array(z.instanceof(File)),
});

const zaimRowSchema = z.object({
  日付: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  方法: z.enum(["payment", "income", "balance"]),
  カテゴリ: z.string(),
  カテゴリの内訳: z.string(),
  支払元: z.string(),
  入金先: z.string(),
  品目: z.string(),
  メモ: z.string(),
  お店: z.string(),
  通貨: z.string(),
  収入: z.string().transform((val) => Number(val)),
  支出: z.string().transform((val) => Number(val)),
  振替: z.string().transform((val) => Number(val)),
  残高調整: z.string().transform((val) => Number(val)),
  通貨変換前の金額: z.string().transform((val) => Number(val)),
  集計の設定: z.enum(["常に集計に含める", "集計に含めない"]),
});

function parseCsv(content: string) {
  return Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
  });
}

export async function importFromZaim(
  _prevState: unknown,
  formData: FormData,
): Promise<SubmissionResult> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  console.log({ formData });

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply({
      formErrors: ["ファイルのアップロードに失敗しました"],
    });
  }

  const file = submission.value.file[0];
  const content = await file.text();
  const result = parseCsv(content);

  const parsedResult = z.array(zaimRowSchema).safeParse(result.data);
  if (!parsedResult.success) {
    return {
      status: "error",
      error: {
        file: ["CSVファイルの形式が正しくありません"],
      },
    };
  }

  const filteredResult = parsedResult.data
    .filter((row) => row.方法 !== "balance")
    .filter((row) => row.集計の設定 === "常に集計に含める");
  const insertValues = filteredResult.map((row) => ({
    id: createId(),
    userId,
    date: new Date(row.日付),
    amount: row.方法 === "income" ? row.収入 : row.支出,
    type:
      row.方法 === "income" ? "income" : ("expense" as "income" | "expense"),
    description: row.お店,
    createdAt: new Date(),
  }));

  try {
    await db.insert(transactionTable).values(insertValues).returning();

    revalidatePath("/transactions");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["収支の作成に失敗しました"],
    });
  }
}

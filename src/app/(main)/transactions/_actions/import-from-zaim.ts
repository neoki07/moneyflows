"use server";

import { auth } from "@clerk/nextjs/server";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Papa from "papaparse";
import { z } from "zod";

import { db } from "@/db";
import {
  categoryTable,
  tagTable,
  transactionTable,
  transactionTagTable,
} from "@/db/schema";

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

  const categoriesWithType = filteredResult
    .map((row) => ({
      originalName: row.カテゴリ,
      type: row.方法 === "income" ? ("income" as const) : ("expense" as const),
    }))
    .filter(({ originalName }) => originalName !== "-");

  const uniqueCategories = [
    ...new Map(
      categoriesWithType.map(({ originalName, type }) => {
        const name =
          originalName === "その他"
            ? `その他（${type === "income" ? "収入" : "支出"}）`
            : originalName;
        return [name, { name, type }];
      }),
    ).values(),
  ];

  const uniqueTags = [
    ...new Set(filteredResult.map((row) => row.カテゴリの内訳)),
  ].filter((tag) => tag !== "-");

  try {
    await db.transaction(async (tx) => {
      const categoryInsertValues = uniqueCategories.map(({ name, type }) => ({
        id: createId(),
        userId,
        name,
        type,
        createdAt: new Date(),
      }));

      const categories = await tx
        .insert(categoryTable)
        .values(categoryInsertValues)
        .onConflictDoNothing()
        .returning();

      const tagInsertValues = uniqueTags.map((tagName) => ({
        id: createId(),
        userId,
        name: tagName,
        createdAt: new Date(),
      }));
      const tags = await tx
        .insert(tagTable)
        .values(tagInsertValues)
        .onConflictDoNothing()
        .returning();

      const existingCategories = await tx
        .select()
        .from(categoryTable)
        .where(
          and(
            eq(categoryTable.userId, userId),
            inArray(
              categoryTable.name,
              uniqueCategories.map(({ name }) => name),
            ),
          ),
        );
      const existingTags = await tx
        .select()
        .from(tagTable)
        .where(
          and(eq(tagTable.userId, userId), inArray(tagTable.name, uniqueTags)),
        );

      const categoryMap = new Map(
        [...categories, ...existingCategories].map((category) => [
          category.name,
          category.id,
        ]),
      );
      const tagMap = new Map(
        [...tags, ...existingTags].map((tag) => [tag.name, tag.id]),
      );

      const transactionsWithTags = filteredResult.map((row) => {
        const categoryName =
          row.カテゴリ === "その他"
            ? `その他（${row.方法 === "income" ? "収入" : "支出"}）`
            : row.カテゴリ;

        return {
          transaction: {
            id: createId(),
            userId,
            date: new Date(row.日付),
            amount: row.方法 === "income" ? row.収入 : row.支出,
            type:
              row.方法 === "income"
                ? "income"
                : ("expense" as "income" | "expense"),
            description: row.お店,
            categoryId:
              row.カテゴリ !== "-"
                ? (categoryMap.get(categoryName) ?? null)
                : null,
            createdAt: new Date(),
          },
          tagId:
            row.カテゴリの内訳 !== "-" ? tagMap.get(row.カテゴリの内訳) : null,
        };
      });

      const transactions = await tx
        .insert(transactionTable)
        .values(transactionsWithTags.map((item) => item.transaction))
        .returning();
      console.log({ transactions });

      const transactionTagInsertValues = transactionsWithTags
        .map((item, index) => {
          if (!item.tagId) return null;

          return {
            transactionId: transactions[index].id,
            tagId: item.tagId,
            createdAt: new Date(),
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      if (transactionTagInsertValues.length > 0) {
        await tx.insert(transactionTagTable).values(transactionTagInsertValues);
      }
    });

    revalidatePath("/transactions");

    return { status: "success" };
  } catch (error) {
    console.error(error);

    return submission.reply({
      formErrors: ["データの作成に失敗しました"],
    });
  }
}

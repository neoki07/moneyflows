"use server";

import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { DeepReadonly } from "@/types";

import { FormValues } from "../_components/category-form";

type CreateCategoryInput = DeepReadonly<
  FormValues & {
    type: "income" | "expense";
  }
>;

type CreateCategoryResult = {
  success: boolean;
  errorMessage?: string;
};

export async function createCategory(
  _prevState: CreateCategoryResult,
  input: CreateCategoryInput,
): Promise<CreateCategoryResult> {
  try {
    const [existing] = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.name, input.name))
      .limit(1);

    if (existing) {
      return {
        success: false,
        errorMessage: "このカテゴリー名は既に使用されています",
      };
    }

    await db.insert(categoryTable).values({
      ...input,
      id: createId(),
    });

    revalidatePath("/categories");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      errorMessage: "カテゴリーの作成に失敗しました",
    };
  }
}

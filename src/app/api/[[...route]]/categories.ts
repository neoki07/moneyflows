import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

const getCategoriesSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
});

const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "カテゴリー名を入力してください")
    .max(20, "カテゴリー名は20文字以内で入力してください"),
  type: z.enum(["income", "expense"]),
});

export const categories = new Hono()
  .get("/", zValidator("query", getCategoriesSchema), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const { type } = c.req.valid("query");

    const categories = await db
      .select()
      .from(categoryTable)
      .where(
        and(
          eq(categoryTable.userId, auth.userId),
          type ? eq(categoryTable.type, type) : undefined,
        ),
      );

    return c.json({ categories });
  })
  .post("/", zValidator("json", createCategorySchema), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const input = c.req.valid("json");

    const [existing] = await db
      .select()
      .from(categoryTable)
      .where(
        and(
          eq(categoryTable.userId, auth.userId),
          eq(categoryTable.name, input.name),
        ),
      )
      .limit(1);

    if (existing) {
      return c.json({ message: "このカテゴリー名は既に使用されています" }, 400);
    }

    const [category] = await db
      .insert(categoryTable)
      .values({
        id: createId(),
        ...input,
        userId: auth.userId,
      })
      .returning();

    return c.json({ category });
  });

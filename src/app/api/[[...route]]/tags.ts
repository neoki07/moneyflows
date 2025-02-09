import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db";
import { tagTable } from "@/db/schema";

const createTagSchema = z.object({
  name: z
    .string({ required_error: "タグ名を入力してください" })
    .min(1, "タグ名を入力してください")
    .max(20, "タグ名は20文字以内で入力してください"),
});

export const tags = new Hono()
  .get("/", async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const tags = await db
      .select()
      .from(tagTable)
      .where(eq(tagTable.userId, auth.userId))
      .orderBy(tagTable.name);

    return c.json({ tags });
  })
  .post("/", zValidator("json", createTagSchema), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "ログインしてください" }, 401);
    }

    const input = c.req.valid("json");

    const [tag] = await db
      .insert(tagTable)
      .values({
        id: createId(),
        userId: auth.userId,
        name: input.name,
        createdAt: new Date(),
      })
      .returning();

    return c.json({ tag });
  });

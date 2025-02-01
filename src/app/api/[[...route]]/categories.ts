import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";
export const categories = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      type: z.enum(["income", "expense"]).optional(),
    }),
  ),
  async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ message: "You are not logged in." }, 401);
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
  },
);

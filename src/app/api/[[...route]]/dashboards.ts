import { getAuth } from "@hono/clerk-auth";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";

export const dashboards = new Hono().get("/:dashboardId", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ message: "ログインしてください" }, 401);
  }

  const { dashboardId } = c.req.param();

  const [dashboard] = await db
    .select({
      id: dashboardTable.id,
      name: dashboardTable.name,
      widgets: dashboardTable.widgets,
    })
    .from(dashboardTable)
    .where(
      and(
        eq(dashboardTable.userId, auth.userId),
        eq(dashboardTable.id, dashboardId),
      ),
    )
    .limit(1);

  if (!dashboard) {
    return c.json({ message: "ダッシュボードが見つかりません" }, 404);
  }

  return c.json({
    ...dashboard,
    widgets: dashboard.widgets as unknown[],
  });
});

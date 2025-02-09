"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq, not } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";

type UpdateDashboardInput = {
  id: string;
  name: string;
  widgets: unknown[];
};

export async function updateDashboard({
  id,
  name,
  widgets,
}: UpdateDashboardInput) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const [existing] = await db
    .select()
    .from(dashboardTable)
    .where(
      and(
        eq(dashboardTable.userId, userId),
        eq(dashboardTable.name, name),
        not(eq(dashboardTable.id, id)),
      ),
    )
    .limit(1);

  if (existing) {
    throw new Error("このダッシュボード名は既に使用されています");
  }

  await db
    .update(dashboardTable)
    .set({
      name,
      widgets,
    })
    .where(and(eq(dashboardTable.id, id), eq(dashboardTable.userId, userId)));
}

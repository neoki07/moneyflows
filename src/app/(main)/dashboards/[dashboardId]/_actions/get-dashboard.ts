"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";

export async function getDashboard(id: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const [dashboard] = await db
    .select({
      id: dashboardTable.id,
      name: dashboardTable.name,
      widgets: dashboardTable.widgets,
    })
    .from(dashboardTable)
    .where(and(eq(dashboardTable.id, id), eq(dashboardTable.userId, userId)));

  if (!dashboard) {
    throw new Error("Dashboard not found");
  }

  return {
    ...dashboard,
    widgets: dashboard.widgets as unknown[],
  };
}

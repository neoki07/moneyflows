"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";

export async function getDashboards() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const dashboards = await db
    .select({
      id: dashboardTable.id,
      name: dashboardTable.name,
    })
    .from(dashboardTable)
    .where(eq(dashboardTable.userId, userId));

  return dashboards;
}

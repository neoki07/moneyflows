"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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

  await db
    .update(dashboardTable)
    .set({
      name,
      widgets: JSON.stringify(widgets),
    })
    .where(and(eq(dashboardTable.id, id), eq(dashboardTable.userId, userId)));

  revalidatePath(`/dashboards/${id}`);
}

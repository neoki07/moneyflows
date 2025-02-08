"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";

export async function deleteDashboard(id: string, currentPath: string) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await db
    .delete(dashboardTable)
    .where(and(eq(dashboardTable.id, id), eq(dashboardTable.userId, userId)));

  if (currentPath === `/dashboards/${id}`) {
    redirect("/");
  }

  revalidatePath("/");
}

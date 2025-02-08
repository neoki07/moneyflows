"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ComponentProps } from "react";

import { db } from "@/db";
import { dashboardTable } from "@/db/schema";
import { ComponentDataType } from "@/lib/gridstack";

import { BalanceChart } from "../_components/widgets/charts/balance-chart";

type UpdateDashboardInput = {
  id: string;
  name: string;
  widgets: unknown[];
};

const mockWidgets = [
  {
    id: "balance-chart",
    h: 3,
    w: 12,
    x: 0,
    y: 0,
    content: JSON.stringify({
      name: "BalanceChart",
      props: {},
    } satisfies ComponentDataType<ComponentProps<typeof BalanceChart>>),
  },
];

export async function updateDashboard({ id, name }: UpdateDashboardInput) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await db
    .update(dashboardTable)
    .set({
      name,
      widgets: JSON.stringify(mockWidgets),
    })
    .where(and(eq(dashboardTable.id, id), eq(dashboardTable.userId, userId)));

  revalidatePath(`/dashboards/${id}`);
}

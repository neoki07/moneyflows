"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";

import { api } from "@/lib/hono";

import { DashboardSkeleton } from "../dashboard-skeleton";
import { DashboardPresenter } from "./presentation";

type Dashboard = {
  id: string;
  name: string;
  widgets: unknown[];
};

export function Dashboard() {
  const params = useParams();
  const dashboardId = params.dashboardId as string;

  const fetcher = async () => {
    const response = await api.dashboards[":dashboardId"].$get({
      param: { dashboardId },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

  const { data: dashboard, isValidating } = useSWR<Dashboard>(
    ["dashboard", dashboardId],
    fetcher,
  );

  if (isValidating) {
    return <DashboardSkeleton />;
  }

  if (!dashboard) {
    return null;
  }

  return <DashboardPresenter dashboard={dashboard} />;
}

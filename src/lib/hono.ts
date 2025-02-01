import { hc } from "hono/client";

import { apiRoutes } from "@/app/api/[[...route]]/route";

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error("NEXT_PUBLIC_APP_URL is not set");
}

type AppType = typeof apiRoutes;

export const { api } = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL);

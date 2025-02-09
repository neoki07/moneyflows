import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { categories } from "./categories";
import { dashboards } from "./dashboards";
import { tags } from "./tags";
import { transactions } from "./transactions";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());

const routes = app
  .route("/transactions", transactions)
  .route("/categories", categories)
  .route("/tags", tags)
  .route("/dashboards", dashboards);

export const GET = handle(routes);
export const POST = handle(routes);

export type AppType = typeof routes;

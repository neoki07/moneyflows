import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { categories } from "./categories";
import { tags } from "./tags";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());

const routes = app.route("/categories", categories).route("/tags", tags);

export const GET = handle(routes);
export const POST = handle(routes);

export type AppType = typeof routes;

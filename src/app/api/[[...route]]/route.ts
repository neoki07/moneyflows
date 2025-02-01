import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { categories } from "./categories";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());

export const apiRoutes = app.route("/categories", categories);

export const GET = handle(apiRoutes);
export const POST = handle(apiRoutes);

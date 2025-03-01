import { drizzle } from "drizzle-orm/postgres-js";
import { reset } from "drizzle-seed";
import postgres from "postgres";

import * as schema from "@/db/schema";

export async function truncateAllTables(connectionString: string) {
  console.log("Starting database truncation...");

  try {
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client);

    await reset(db, schema);

    await client.end();
    console.log("Database truncation completed successfully");
  } catch (error) {
    console.error(
      `Database connection/reset error: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

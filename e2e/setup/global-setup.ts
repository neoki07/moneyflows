import { clerkSetup } from "@clerk/testing/playwright";

import { truncateAllTables } from "./truncate";

async function globalSetup() {
  await clerkSetup();

  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.",
    );
  }

  const connectionString = process.env.DATABASE_TRUNCATE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_TRUNCATE_URL or DATABASE_URL environment variable is not set",
    );
  }

  try {
    console.log("Running database reset before E2E tests...");
    await truncateAllTables(connectionString);
    console.log("Database reset completed");
  } catch (error) {
    console.error("Error during database reset:", error);
    throw error;
  }
}

export default globalSetup;

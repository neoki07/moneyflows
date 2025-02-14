import { clerkSetup } from "@clerk/testing/playwright";

import { setupTestDatabase } from "./global";

async function globalSetup() {
  const { connectionString } = await setupTestDatabase();

  process.env.DATABASE_URL = connectionString;

  await clerkSetup();

  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.",
    );
  }
}

export default globalSetup;

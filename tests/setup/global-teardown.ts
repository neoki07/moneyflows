import { teardownTestDatabase } from "./global";

async function globalTeardown() {
  const container = global.__TEST_DB_CONTAINER__;
  if (!container) {
    console.warn("No test database container found");
    return;
  }

  await teardownTestDatabase(container);
}

export default globalTeardown;

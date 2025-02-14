import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __TEST_DB_CONTAINER__: StartedPostgreSqlContainer | undefined;
}

export async function setupTestDatabase() {
  const container = await new PostgreSqlContainer()
    .withDatabase("moneyflows_test")
    .withUsername("postgres")
    .withPassword("postgres")
    .start();

  global.__TEST_DB_CONTAINER__ = container;

  const connectionString = container.getConnectionUri();

  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: "./db/migrations" });
  await migrationClient.end();

  return { container, connectionString };
}

export async function teardownTestDatabase(
  container: StartedPostgreSqlContainer,
) {
  await container.stop();
  global.__TEST_DB_CONTAINER__ = undefined;
}

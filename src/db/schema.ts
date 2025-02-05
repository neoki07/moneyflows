import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
] as const);

export const categoryTable = pgTable(
  "category",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    type: transactionTypeEnum().notNull(),
  },
  (table) => [unique().on(table.userId, table.name)],
);

export const transactionTable = pgTable("transaction", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  categoryId: text("category_id").references(() => categoryTable.id),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  type: transactionTypeEnum().notNull(),
});

export const tagTable = pgTable(
  "tag",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
  },
  (table) => [unique().on(table.userId, table.name)],
);

export const transactionTagTable = pgTable(
  "transaction_tag",
  {
    transactionId: text("transaction_id")
      .notNull()
      .references(() => transactionTable.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tagTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.transactionId, table.tagId] })],
);

export const dashboardTable = pgTable(
  "dashboard",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    widgets: jsonb("widgets").notNull().default("[]"),
  },
  (table) => [unique().on(table.userId, table.name)],
);

export type CategoryRecord = typeof categoryTable.$inferSelect;
export type InsertCategoryRecord = typeof categoryTable.$inferInsert;

export type TransactionRecord = typeof transactionTable.$inferSelect;
export type InsertTransactionRecord = typeof transactionTable.$inferInsert;

export type TagRecord = typeof tagTable.$inferSelect;
export type InsertTagRecord = typeof tagTable.$inferInsert;

export type DashboardRecord = typeof dashboardTable.$inferSelect;
export type InsertDashboardRecord = typeof dashboardTable.$inferInsert;

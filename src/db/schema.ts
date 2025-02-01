import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
] as const);

export const categoryTable = pgTable("category", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull().unique(),
  type: transactionTypeEnum().notNull(),
});

export const transactionTable = pgTable("transaction", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  categoryId: text("category_id").references(() => categoryTable.id),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(),
  type: transactionTypeEnum().notNull(),
});

export type CategoryRecord = typeof categoryTable.$inferSelect;
export type InsertCategoryRecord = typeof categoryTable.$inferInsert;

export type TransactionRecord = typeof transactionTable.$inferSelect;
export type InsertTransactionRecord = typeof transactionTable.$inferInsert;

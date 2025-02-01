ALTER TABLE "category" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "user_id" text NOT NULL;
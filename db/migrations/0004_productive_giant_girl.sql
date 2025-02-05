CREATE TABLE "dashboard" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"widgets" jsonb DEFAULT '[]' NOT NULL,
	CONSTRAINT "dashboard_name_unique" UNIQUE("name")
);

ALTER TABLE "category" DROP CONSTRAINT "category_name_unique";--> statement-breakpoint
ALTER TABLE "dashboard" DROP CONSTRAINT "dashboard_name_unique";--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_name_unique" UNIQUE("user_id","name");--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_user_id_name_unique" UNIQUE("user_id","name");--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_name_unique" UNIQUE("user_id","name");
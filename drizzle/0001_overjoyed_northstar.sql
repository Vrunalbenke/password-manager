CREATE TABLE `brand` (
	`brand_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`logo_url` text,
	`domain` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `brand_brand_id_unique` ON `brand` (`brand_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `brand_name_unique` ON `brand` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `brand_domain_unique` ON `brand` (`domain`);--> statement-breakpoint
ALTER TABLE `atm_pin` ADD `brand_id` integer NOT NULL REFERENCES brand(brand_id);--> statement-breakpoint
ALTER TABLE `credit_card` ADD `card_name` text;--> statement-breakpoint
ALTER TABLE `credit_card` ADD `brand_id` integer NOT NULL REFERENCES brand(brand_id);--> statement-breakpoint
ALTER TABLE `password` ADD `brand_id` integer NOT NULL REFERENCES brand(brand_id);--> statement-breakpoint
ALTER TABLE `password` DROP COLUMN `title`;
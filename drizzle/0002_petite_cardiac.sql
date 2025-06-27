CREATE TABLE `CryptoKey` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`wallet_type` text,
	`key_type` text,
	`encrypted_private_key` text,
	`iv_private_key` text,
	`encrypted_seed_phrase` text,
	`iv_seed_phrase` text,
	`address` text,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text,
	`last_accessed` text
);
--> statement-breakpoint
CREATE TABLE `CryptoKeyTag` (
	`crypto_key_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`crypto_key_id`) REFERENCES `CryptoKey`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_password` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`encrypted_password` text NOT NULL,
	`iv` text NOT NULL,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`brand_id` text NOT NULL,
	FOREIGN KEY (`brand_id`) REFERENCES `brand`(`brand_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_password`("id", "username", "encrypted_password", "iv", "note", "created_at", "updated_at", "brand_id") SELECT "id", "username", "encrypted_password", "iv", "note", "created_at", "updated_at", "brand_id" FROM `password`;--> statement-breakpoint
DROP TABLE `password`;--> statement-breakpoint
ALTER TABLE `__new_password` RENAME TO `password`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
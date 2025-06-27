CREATE TABLE `aadhaar` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`aadhaar_number` text NOT NULL,
	`name` text NOT NULL,
	`dob` text,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `aadhaar_tag` (
	`aadhaar_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`aadhaar_id`) REFERENCES `aadhaar`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `app_meta` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`salt_hex` text NOT NULL,
	`username` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `atm_pin` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bank_name` text NOT NULL,
	`card_number` text,
	`pin` text NOT NULL,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `atm_pin_tag` (
	`atm_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`atm_id`) REFERENCES `atm_pin`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `credit_card` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`card_number` text NOT NULL,
	`cardholder_name` text NOT NULL,
	`expiry` text NOT NULL,
	`cvv` text NOT NULL,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `credit_card_tag` (
	`card_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`card_id`) REFERENCES `credit_card`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pan_number` text NOT NULL,
	`name` text NOT NULL,
	`dob` text,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pan_tag` (
	`pan_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`pan_id`) REFERENCES `pan`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `password` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`username` text,
	`encrypted_password` text NOT NULL,
	`iv` text NOT NULL,
	`note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `password_tag` (
	`password_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`password_id`) REFERENCES `password`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tag_name_unique` ON `tag` (`name`);
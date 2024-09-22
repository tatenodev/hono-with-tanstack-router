CREATE TABLE `auth_otp` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phone` text(256),
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text(256)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`full_name`);
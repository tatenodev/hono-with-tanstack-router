import { sqliteTable, int, text, index } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
	"users",
	{
		id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
		fullName: text("full_name", { length: 256 }),
	},
	(users) => ({
		nameIdx: index("name_idx").on(users.fullName),
	}),
);

export const authOtps = sqliteTable("auth_otp", {
	id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	phone: text("phone", { length: 256 }),
	userId: int("user_id").references(() => users.id),
});

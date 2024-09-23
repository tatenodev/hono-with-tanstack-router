import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";

import { users } from "./schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

type ApiType =
	| typeof getClockRoute
	| typeof postUserRoute
	| typeof deleteUserRoute;

type Env = {
	Bindings: {
		DB: D1Database;
	};
};

const app = new Hono<Env>();

const getClockRoute = app.get("/api/clock", async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(users).all();

	return c.json({
		time: new Date().toLocaleTimeString(),
		users: result,
	});
});

// @see https://github.com/honojs/middleware/tree/main/packages/zod-validator
const postUserSchema = z.object({
	full_name: z.string(),
});

const postUserRoute = app.post(
	"/api/user",
	zValidator("json", postUserSchema, async (result, c) => {
		if (!result.success) {
			return c.text("params Invalid", 500);
		}
	}),
	async (c) => {
		const body = c.req.valid("json");
		const db = drizzle(c.env.DB);
		const result = await db.insert(users).values({
			fullName: body.full_name,
		});

		if (!result.success) {
			return c.text("Invalid", 500);
		}

		return c.json({
			full_name: body.full_name,
		});
	},
);

const deleteUserSchema = z.object({
	id: z.string(),
});

const deleteUserRoute = app.delete(
	"/api/user/:id",
	zValidator("param", deleteUserSchema, async (result, c) => {
		if (!result.success) {
			console.log(result.error);
			return c.text("params Invalid", 500);
		}
	}),
	async (c) => {
		const db = drizzle(c.env.DB);
		const userId = c.req.param("id");
		const result = await db
			.delete(users)
			.where(eq(users.id, Number(userId)))
			.returning();
		return c.json(result);
	},
);

app.get("*", (c) => {
	return c.html(
		renderToString(
			<html lang="ja">
				<head>
					<meta charSet="utf-8" />
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<link
						rel="stylesheet"
						href="https://cdn.simplecss.org/simple.min.css"
					/>
					{import.meta.env.PROD ? (
						<script type="module" src="/static/client.js" />
					) : (
						<script type="module" src="/src/main.tsx" />
					)}
				</head>
				<body>
					<div id="root" />
				</body>
			</html>,
		),
	);
});

export default app;

import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { users } from "./schema";

type Env = {
	Bindings: {
		DB: D1Database;
	};
};

const app = new Hono<Env>();

app.get("/api/clock", async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(users).all();

	return c.json({
		time: new Date().toLocaleTimeString(),
		users: result,
	});
});

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

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/foo")({
	component: Foo,
});

function Foo() {
	const data = Route.useLoaderData();

	return <div className="p-2">Hello from Foo!</div>;
}

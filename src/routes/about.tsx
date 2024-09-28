import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	pendingComponent: Foo,
});

function Foo() {
	const data = Route.useLoaderData();

	return <div className="p-2">Pending</div>;
}

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
	pendingComponent: () => <div>loading...</div>,
	component: About,
});

function About() {
	const data = Route.useLoaderData();

	return <div className="p-2">Hello from About! {JSON.stringify(data)}</div>;
}

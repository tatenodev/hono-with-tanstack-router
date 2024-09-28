import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
	component: Index,
	pendingComponent: () => <div>loading...</div>,
});

function Index() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<ClockButton />
		</div>
	);
}

const ClockButton = () => {
	const [response, setResponse] = useState<string | null>(null);
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");

	const handleClick = async () => {
		const response = await fetch("/api/clock");
		const data = await response.json();
		setResponse(JSON.stringify(data, null, 2));
	};

	const handleCreateUser = async (fullName: string) => {
		const res = await fetch("/api/user", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ full_name: fullName }),
		});
	};

	const handleDeleteUser = async (id: string) => {
		const res = await fetch(`/api/user/${id}`, {
			method: "DELETE",
		});
	};

	return (
		<div>
			<button type="button" onClick={() => handleCreateUser(userName)}>
				create user
			</button>
			<input
				type="text"
				placeholder="user name"
				onChange={(value) => setUserName(value.target.value)}
				value={userName}
			/>

			<button type="button" onClick={() => handleDeleteUser(userId)}>
				delete user
			</button>
			<input
				type="text"
				placeholder="user id"
				onChange={(value) => setUserId(value.target.value)}
				value={userId}
			/>

			<button type="button" onClick={handleClick}>
				Get Data
			</button>
			{response && <pre>{response}</pre>}
		</div>
	);
};

import { createRoot } from "react-dom/client";
import { useState } from "react";

function App() {
	return (
		<>
			<h1>Hello, Hono with React!</h1>
			<h2>Example of useState()</h2>
			<Counter />
			<h2>Example of API fetch()</h2>
			<ClockButton />
		</>
	);
}

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<button type="button" onClick={() => setCount(count + 1)}>
			You clicked me {count} times
		</button>
	);
}

const ClockButton = () => {
	const [response, setResponse] = useState<string | null>(null);

	const handleClick = async () => {
		const response = await fetch("/api/clock");
		const data = await response.json();
		setResponse(JSON.stringify(data, null, 2));
	};

	return (
		<div>
			<button type="button" onClick={handleClick}>
				Get Server Time
			</button>
			{response && <pre>{response}</pre>}
		</div>
	);
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);
root.render(<App />);

const $output = document.querySelector<HTMLDivElement>("div#output");

const worker = new Worker("./dist/web-worker.js");

(() => {
	const $testInput = document.querySelector<HTMLInputElement>("input#test");

	// message from web-worker
	worker.onmessage = e => {
		console.log(`Received message from worker: ${e.data}`);
		// const $p = document.createElement("p");
		// $p.textContent = e.data;
		// if ($output) $output.append($p);
	};

	worker.onerror = function (e) {
		console.error("Error from worker: ", e.message);
	};

	if (!$testInput) return;

	// $testInput.addEventListener("input", e => {
	// 	const target = e.target as HTMLInputElement;
	// 	const value = target.value;
	// 	console.log("🚀 ~ value:", value);
	// });
})();

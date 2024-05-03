(() => {
	postMessage("Hello from web worker");

	onmessage = event => {
		const textDecoder = new TextDecoder("utf-8");

		const data = new Uint8Array(event.data);

		const text = textDecoder.decode(data);

		postMessage(text);
	};
})();

interface Chunk {
	start: number;
	end: number;
	blob: Blob;
}

(() => {
	const $fileInput = document.querySelector<HTMLInputElement>("#file-input");
	const $fileLabel = document.querySelector<HTMLLabelElement>("label");
	const $fileStatus = document.querySelector<HTMLHeadingElement>("#status");

	if (!$fileInput) throw new Error("No file input element found");

	const readFileAsync = (reader: FileReader): Promise<ArrayBuffer> => {
		return new Promise((resolve, reject) => {
			reader.onload = event => {
				const target = event.target;

				if (!target) return;
				const buffer = target.result as ArrayBuffer;
				const slice = new Uint8Array(buffer);

				// Process the buffer data here
				worker.postMessage(slice, [buffer]);

				resolve(buffer); // Resolve promise with the buffer
			};

			reader.onerror = error => {
				reject(error); // Reject promise on error
			};
		});
	};

	async function handleChunk(chunk: Chunk) {
		const reader = new FileReader();

		// Read specific byte range
		reader.readAsArrayBuffer(chunk.blob.slice(0, chunk.end - chunk.start));

		await readFileAsync(reader);
	}

	async function processFileInChunks(file: File, chunkSize: number) {
		for (let start = 0; start < file.size; start += chunkSize) {
			const end = Math.min(start + chunkSize, file.size);
			const chunk: Chunk = { start, end, blob: file.slice(start, end) };

			await handleChunk(chunk);
		}
	}

	const handleFileInputChange = async (e: Event) => {
		try {
			const file = (e.target as HTMLInputElement).files?.[0];

			const chunkSize = 1024 * 1024 * 15; // 15MB chunk size

			if (!file) return;

			if ($fileLabel) {
				$fileLabel.textContent = file.name || "Select large file";
			}

			// * slower processing
			// const reader = new FileReader();

			// reader.readAsText(file, "UTF-8");

			// reader.onload = event => {
			// 	const target = event.target;

			// 	if ($output && target) {
			// 		$output.innerHTML = target.result as string;
			// 	}
			// };

			// reader.onerror = error => {
			// 	console.error("Error:", error);
			// };

			// * faster processing
			if ($fileStatus) {
				$fileStatus.textContent = "Processing file...";
			}

			console.time("file-process");
			await processFileInChunks(file, chunkSize);
			console.timeEnd("file-process");

			if ($fileStatus) {
				$fileStatus.textContent = "File processed successfully!";
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	$fileInput.addEventListener("change", handleFileInputChange);
})();

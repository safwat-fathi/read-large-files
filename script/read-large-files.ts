// (() => {
//   // const textDecoder = new TextDecoder();
//   let offset = 0;

//   const $fileInput = document.querySelector<HTMLInputElement>("#file-input");
//   const $fileLabel = document.querySelector<HTMLLabelElement>("label");

//   if (!$fileInput) throw new Error("No file input element found");

//   const handleChunk = (chunk: Blob) => {
//     const reader = new FileReader();
//     reader.readAsArrayBuffer(chunk); // Read as ArrayBuffer (buffer)

//     reader.onload = handleFileRead(1);
//   };

//   const handleFileRead =
//     (chunkSize: number) => (event: ProgressEvent<FileReader>) => {
//       const target = event.target;

//       if (!target) return;
//       // console.log("🚀 ~ target:", target);

//       let buffer = new Uint8Array(target.result as ArrayBuffer);

//       for (let i = 0; i < buffer.length; i += chunkSize) {
//         const chunk = buffer.slice(i, i + chunkSize);

//         // transfer these chunks to  a service worker to read as text
//         window.filesWorker.postMessage(chunk, [chunk.buffer]);
//         // const text = textDecoder.decode(chunk);
//         // console.log("🚀 ~ text:", text);
//       }
//     };

//   const handleFileInputChange =
//     (chunks = 10) =>
//     (event: Event) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       // const fileSlices = [];

//       if (!file) return;

//       if ($fileLabel) {
//         $fileLabel.textContent = file.name || "Select large file";
//       }

//       // const CHUNK_SIZE = chunks * 1024;

//       // const fileSlice = file.slice(offset, offset + CHUNK_SIZE);

//       // while (offset <= file.size) {
//       //   fileSlices.push(fileSlice);
//       //   offset += CHUNK_SIZE;
//       //   // fileSlice = file.slice(CHUNK_SIZE, CHUNK_SIZE * 2);
//       // }
//       // console.log("🚀 ~ fileSlices:", fileSlices);
//       // const fileReader = new FileReader();

//       // fileReader.onload = handleFileRead(CHUNK_SIZE);

//       // for (const fileSlice of fileSlices) {
//       //   fileReader.readAsArrayBuffer(fileSlice);
//       // }

//       const chunkSize = 1024 * 1024; // 1MB chunk size (adjust as needed)

//       for (let start = 0; start < file.size; start += chunkSize) {
//         // console.log("🚀 ~ start:", start);
//         const end = Math.min(start + chunkSize, file.size);
//         const chunk = file.slice(start, end);
//         console.log("🚀 ~ chunk:", chunk);

//         // Process the chunk (read as buffer)
//         handleChunk(chunk);
//       }

//       // fileReader.readAsArrayBuffer(file);
//     };

//   $fileInput.addEventListener("change", handleFileInputChange());
// })();
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

  async function handleChunk(chunk: Chunk) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(chunk.blob.slice(0, chunk.end - chunk.start)); // Read specific byte range

    return new Promise((resolve, reject) => {
      reader.onload = event => {
        const target = event.target;

        if (!target) return;
        const buffer = target.result as ArrayBuffer;
        const slice = new Uint8Array(buffer);
        // Process the buffer data here
        // window.fileWorker.postMessage(slice, [buffer]);

        if (worker) worker.postMessage(slice, [buffer]);

        resolve(buffer); // Resolve promise with the buffer
      };

      reader.onerror = error => {
        reject(error); // Reject promise on error
      };
    });
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
      const chunkSize = 1024 * 1024; // 1MB chunk size (adjust as needed)

      if (!file) return;

      if ($fileLabel) {
        $fileLabel.textContent = file.name || "Select large file";
      }

      // * slower processing
      // const reader = new FileReader();

      // reader.onload = event => {
      //   const target = event.target;
      //   if ($output && target) $output.innerHTML = target.result as string;
      // };

      // reader.readAsText(file);

      // * faster processing
      if ($fileStatus) {
        $fileStatus.textContent = "Processing file...";
      }

      console.time("file-process");
      await processFileInChunks(file, chunkSize);
      console.timeEnd("file-process");

      if (worker) worker.terminate();

      if ($fileStatus) {
        $fileStatus.textContent = "File processed successfully!";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  $fileInput.addEventListener("change", handleFileInputChange);
})();

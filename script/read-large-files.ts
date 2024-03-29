(() => {
  const fileReader = new FileReader();
  // const textDecoder = new TextDecoder();

  const fileInput = document.querySelector<HTMLInputElement>("#file-input");

  if (!fileInput) throw new Error("No file input element found");

  const handleFileRead =
    (chunkSIze: number) => (event: ProgressEvent<FileReader>) => {
      const target = event.target;

      if (!target) return;

      let buffer = new Uint8Array(target.result as ArrayBuffer);

      for (let i = 0; i < buffer.length; i += chunkSIze) {
        const chunk = buffer.slice(i, i + chunkSIze);

        // transfer these chunks to  a service worker to read as text
        worker.postMessage(chunk, [chunk.buffer]);
        // const text = textDecoder.decode(chunk);
        // console.log("🚀 ~ text:", text);

        // uploadChunk(chunk);
      }
    };

  const handleFileInputChange =
    (chunks = 10) =>
    (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) return;

      const CHUNK_SIZE = chunks * 1024;

      fileReader.onload = handleFileRead(CHUNK_SIZE);
      fileReader.readAsArrayBuffer(file);
    };

  fileInput.addEventListener("change", handleFileInputChange(50));
})();

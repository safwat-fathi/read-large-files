"use strict";
(() => {
    const fileReader = new FileReader();
    // const textDecoder = new TextDecoder();
    const fileInput = document.querySelector("#file-input");
    if (!fileInput)
        throw new Error("No file input element found");
    const handleFileRead = (chunkSIze) => (event) => {
        const target = event.target;
        if (!target)
            return;
        let buffer = new Uint8Array(target.result);
        for (let i = 0; i < buffer.length; i += chunkSIze) {
            const chunk = buffer.slice(i, i + chunkSIze);
            // transfer these chunks to  a service worker to read as text
            worker.postMessage(chunk, [chunk.buffer]);
            // const text = textDecoder.decode(chunk);
            // console.log("🚀 ~ text:", text);
            // uploadChunk(chunk);
        }
    };
    const handleFileInputChange = (chunks = 10) => (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const CHUNK_SIZE = chunks * 1024;
        fileReader.onload = handleFileRead(CHUNK_SIZE);
        fileReader.readAsArrayBuffer(file);
    };
    fileInput.addEventListener("change", handleFileInputChange(50));
})();

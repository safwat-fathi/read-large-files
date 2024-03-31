(() => {
  onmessage = event => {
    const textDecoder = new TextDecoder("utf-8");
    // console.log("Message received from main script");
    // const data = event.data;
    // console.log("SW data:", data);
    // console.log("SW data type:", typeof data);

    const data = new Uint8Array(event.data);
    // console.log("🚀 ~ data:", data);
    // uploadChunk(data);

    const text = textDecoder.decode(data);

    postMessage(text);
    // postMessage("1");
  };
})();

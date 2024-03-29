"use strict";
(() => {
    onmessage = event => {
        const textDecoder = new TextDecoder();
        console.log("Message received from main script");
        let data = event.data;
        console.log("SW data:", data);
        console.log("SW data type:", typeof data);
        console.log("SW data is an ArrayBuffer");
        data = new Uint8Array(data);
        const text = textDecoder.decode(data);
        const workerResult = text;
        console.log("🚀 ~ workerResult:", workerResult);
        // console.log("Posting message back to main script");
        postMessage(workerResult);
        // postMessage("aaaaaaaaaaaaaaaaaa");
    };
})();

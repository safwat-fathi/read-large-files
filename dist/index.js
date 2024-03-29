"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const worker = new Worker("./dist/service-worker.js");
const fetcher = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch("/upload-endpoint", {
        method: "POST",
        body,
    });
});
const uploadChunk = (chunk_1, ...args_1) => __awaiter(void 0, [chunk_1, ...args_1], void 0, function* (chunk, retries = 3) {
    const formData = new FormData();
    const fileChunk = new Blob([chunk], { type: "application/octet-stream" });
    formData.append("file", fileChunk);
    try {
        yield fetcher(formData);
    }
    catch (error) {
        if (retries > 0) {
            yield uploadChunk(chunk, retries - 1);
        }
        else {
            console.error("Failed to upload chunk: ", error);
        }
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const registerServiceWorker = () => __awaiter(void 0, void 0, void 0, function* () {
        if ("serviceWorker" in navigator) {
            try {
                console.log("registering service worker...");
                const registration = yield navigator.serviceWorker.register("./dist/service-worker.js");
                if (registration.installing) {
                    console.log("Service worker installing");
                }
                else if (registration.waiting) {
                    console.log("Service worker installed");
                }
                else if (registration.active) {
                    console.log("Service worker active");
                }
            }
            catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    });
    yield registerServiceWorker();
    worker.onmessage = e => {
        console.log(e.data);
    };
}))();

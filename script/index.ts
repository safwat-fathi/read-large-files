const worker = new Worker("./dist/service-worker.js");

const fetcher = async (body: FormData) =>
  await fetch("/upload-endpoint", {
    method: "POST",
    body,
  });

const uploadChunk = async (chunk: Uint8Array, retries = 3) => {
  const formData = new FormData();
  const fileChunk = new Blob([chunk], { type: "application/octet-stream" });
  formData.append("file", fileChunk);

  try {
    await fetcher(formData);
  } catch (error) {
    if (retries > 0) {
      await uploadChunk(chunk, retries - 1);
    } else {
      console.error("Failed to upload chunk: ", error);
    }
  }
};

(async () => {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        console.log("registering service worker...");

        const registration = await navigator.serviceWorker.register(
          "./dist/service-worker.js"
        );

        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  await registerServiceWorker();

  worker.onmessage = e => {
    console.log(e.data);
  };
})();

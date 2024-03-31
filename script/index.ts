(async () => {
  window.fileWorker = new Worker("./dist/service-worker.js");

  const $testInput = document.querySelector<HTMLInputElement>("input#test");

  // let chunks = 0;

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

  window.fileWorker.onmessage = e => {
    console.log(e.data);
    // chunks++;
    // if (!$textBox) throw new Error("Error loading UI elements");
    // const p = document.createElement("p");
    // p.innerHTML = e.data;
    // $textBox.appendChild(p);
  };

  // if (!$chunks) throw new Error("Error loading UI elements");

  // $chunks.innerHTML = chunks.toString();

  $testInput?.addEventListener("input", e => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    console.log("🚀 ~ value:", value);

    // worker.postMessage(value);
  });
})();

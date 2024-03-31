(async () => {
  const $testInput = document.querySelector<HTMLInputElement>("input#test");

  // feature detection
  if (window.Worker) {
    window.fileWorker = new Worker("./dist/web-worker.js");
  }

  // on message from web worker
  window.fileWorker.onmessage = e => {
    console.log(e.data);
  };

  $testInput?.addEventListener("input", e => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    console.log("🚀 ~ value:", value);
  });
})();

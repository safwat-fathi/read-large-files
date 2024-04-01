const $output = document.querySelector<HTMLDivElement>("div#output");

(async () => {
  const $testInput = document.querySelector<HTMLInputElement>("input#test");

  // feature detection
  if (window.Worker) {
    window.fileWorker = new Worker("./dist/web-worker.js");
  }

  // on message from web worker
  window.fileWorker.onmessage = e => {
    // console.log(e.data);

    const $p = document.createElement("p");
    $p.textContent = e.data;
    if ($output) $output.append($p);
  };

  $testInput?.addEventListener("input", e => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    console.log("🚀 ~ value:", value);
  });
})();

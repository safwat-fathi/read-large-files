const $output = document.querySelector<HTMLDivElement>("div#output");

let worker: Worker | null = null;

if (window.Worker) {
  worker = new Worker("./dist/web-worker.js");
}

(async () => {
  const $testInput = document.querySelector<HTMLInputElement>("input#test");

  if (worker) {
    worker.onmessage = e => {
      // console.log(e.data);
      // const $p = document.createElement("p");
      // $p.textContent = e.data;
      // if ($output) $output.append($p);
    };
  }

  $testInput?.addEventListener("input", e => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    console.log("🚀 ~ value:", value);
  });
})();

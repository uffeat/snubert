/* Generic function-style interface to workers. Supports async/await as well as callback. */
const callWorker = (url, arg, callback) => {

  // Handle remote url:
  if (!url.startsWith('.')) {
    url = `${snubert.sourceRoot}workers/get-data.js`;

    // Derive url from snubert source if set:
    if (!url.startsWith('https://')) {
      if (!snubert.sourceRoot) {
        throw new Error(`Snubert source not set.`);
      }
      url = `${snubert.sourceRoot}workers/${url}.js`;
    }

    /* Returns a non-cors-blocking url. */
    const getWorkerUrl = url => {
      const content = `importScripts('${url}');`;
      return URL.createObjectURL(new Blob([content], { type: "text/javascript" }));
    }

    url = getWorkerUrl(url);
  }

  const worker = new Worker(url);
  worker.postMessage(arg);
  // Return promise to enable return of data from worker's onmessage event:
  return new Promise(resolve => {
    worker.onmessage = event => {
      resolve(event.data);
      callback && callback(event.data);
      worker.terminate();
    }
  })
}

export { callWorker };

/*
HOW TO USE (two ways):

1. await:
const data = await window.snubert.callWorker('./workers/get-data.js', 'key=key-1')
console.log(data)
console.log("This is logged AFTER data is logged.")

2. callback:
window.snubert.callWorker('./workers/get-data.js', 'key=key-1', data => {
  console.log(data)
})
console.log("This is logged BEFORE data is logged.")




*/

/* Generic function-style interface to workers. Supports async/await as well as callback. */
const callWorker = (url, arg, callback) => {

  // Handle remote url...
  // WARNING: Remote-url worker are terrible for performance!!!!
  // ... Instead, copy workers to client.
  if (url.startsWith('https://')) {
    // Create a non-cors-blocking url:
    const content = `importScripts('${url}');`;
    url = URL.createObjectURL(new Blob([content], { type: "text/javascript" }));
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
USEAGE EXAMPLE (different ways):

With async...

const dataPromiseLocalGetDataWorker = await snubert.callWorker('./workers/get-data.js', 'key=key-1');
console.log(`Data from local getData worker with await: ${dataPromiseLocalGetDataWorker['data-key']}`);

With callback...

snubert.callWorker('./workers/get-data.js', 'key=key-1', data => {
  console.log(`Data from local getData worker with callback: ${data['data-key']}`);
});
*/

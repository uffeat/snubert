/* Generic function-style interface to workers. Supports async/await as well as callback. */
const callWorker = (url, arg, callback) => {

  // Handle remote url:

  /*
  ------------------------------------------------------------------------------
  WARNING: Using workers with remote urls come with a big hit on performance!!!!
  ------------------------------------------------------------------------------
  Instead, copy workers to client app or use utils.
  */

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
HOW TO USE (different ways):

With async...

1. Poor performance...
const dataPromiseHttpGetDataWorker = await snubert.callWorker('https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/workers/get-data.js', 'key=key-1');
console.log(`Data from http getData worker with await: ${dataPromiseHttpGetDataWorker['data-key']}`);

2. Poor performance...
const dataPromiseSourceGetDataWorker = await snubert.callWorker('get-data', 'key=key-1');
console.log(`Data from source getData worker with await: ${dataPromiseSourceGetDataWorker['data-key']}`);

3. Good performance (requires worker to be present in app, i.e., not a remote url)...
const dataPromiseLocalGetDataWorker = await snubert.callWorker('./workers/get-data.js', 'key=key-1');
console.log(`Data from local getData worker with await: ${dataPromiseLocalGetDataWorker['data-key']}`);

With callback...

4. Poor performance..
snubert.callWorker('https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/workers/get-data.js', 'key=key-1', data => {
  console.log(`Data from callWorker and https: ${data['data-key']}`);
});

5. Poor performance..
snubert.callWorker('get-data', 'key=key-1', data => {
  console.log(`Data from callWorker with source: ${data['data-key']}`);
});

6. Good performance (requires worker to be present in app, i.e., not a remote url)...
snubert.callWorker('./workers/get-data.js', 'key=key-1', data => {
  console.log(`Data from local callWorker and callback: ${data['data-key']}`);
});
*/

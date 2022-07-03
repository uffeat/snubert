/* Generic function-style interface to workers. Supports async/await as well as callback. */
const callWorker = (url, arg, callback) => {
  const worker = new Worker(url)
  worker.postMessage(arg)
  // Return promise to enable return of data from worker's onmessage event:
  return new Promise(resolve => {
    worker.onmessage = event => {
      resolve(event.data)
      callback && callback(event.data)
      worker.terminate()
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

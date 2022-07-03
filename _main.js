// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

snubert.source = 'https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/snubert.min.js';


// Getting data (test)...

// Worker...

const dataPromiseHttpGetDataWorker = await snubert.callWorker('https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/workers/get-data.js', 'key=key-1');
console.log(`Data from http getData worker with await: ${dataPromiseHttpGetDataWorker['data-key']}`);

const dataPromiseSourceGetDataWorker = await snubert.callWorker('./workers/get-data.js', 'key=key-1');
console.log(`Data from source getData worker with await: ${dataPromiseSourceGetDataWorker['data-key']}`);

const dataPromiseLocalGetDataWorker = await snubert.callWorker('./workers/get-data.js', 'key=key-1');
console.log(`Data from local getData worker with await: ${dataPromiseLocalGetDataWorker['data-key']}`);

snubert.callWorker('https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/workers/get-data.js', 'key=key-1', data => {
  console.log(`Data from callWorker and https: ${data['data-key']}`);
});

snubert.callWorker('./workers/get-data.js', 'key=key-1', data => {
  console.log(`Data from local callWorker and callback: ${data['data-key']}`);
});

snubert.callWorker('get-data', 'key=key-1', data => {
  console.log(`Data from callWorker with source: ${data['data-key']}`);
});

// Util...

snubert.getData('key=key-1', data => {
  console.log(`Data from getData with callback: ${data['data-key']}`);
});

const dataPromiseFromGetDataUtil = await snubert.getData('key=key-1');
console.log(`Data from getData util with await: ${dataPromiseFromGetDataUtil['data-key']}`);


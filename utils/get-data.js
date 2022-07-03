/* */
const getData = async (query, callback) => {
  const response = await fetch(`https://snubert.dev/_/api/get-data?${query}`)
    if (response.ok) {
      const data = await response.json();
      callback && callback(data);
      return data;
    }
     //TODO: Handle errors.
}

export { getData };


/*
How to use
----------

1. With callback:

snubert.getData('key=key-1', data => {
  console.log(`Data from getData with callback: ${data['data-key']}`);
});

2. With async:

const dataPromiseFromGetDataUtil = await snubert.getData('key=key-1');
console.log(`Data from getData util with await: ${dataPromiseFromGetDataUtil['data-key']}`);

*/
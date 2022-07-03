/* Web worker for getting data from API. */
self.addEventListener("message", event => {
  const query = event.data;

  // Internal wrapper function to enable async/await (for response):
  asyncWrapper = async () => {
    const response = await fetch(`https://snubert.dev/_/api/get-data?${query}`)
    if (response.ok) {
      const data = await response.json();

      //TODO: Handle errors.

      // "return" promise:
      self.postMessage(data);
    }
  }

  asyncWrapper();
});

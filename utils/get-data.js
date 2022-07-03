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

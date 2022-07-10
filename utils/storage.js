class Storage {
  #keys;
  constructor() {
    if (localStorage.getItem('keys')) {
      this.#keys = JSON.parse(localStorage.getItem('keys'));
    }
    else {
      this.#keys = [];
    }
  }

  get keys() {
    return this.#keys;
  }

  /* Saves item with a given key to local storage. */
  save(key, value) {
    if (!this.#keys.includes(key)) {
      this.#keys.push(key);
      localStorage.setItem('keys', JSON.stringify(this.#keys));
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  /* Removes item with a given key from local storage. */
  remove(key) {
    if (this.#keys.includes(key)) {
      this.#keys = this.#keys.filter(e => e !== value);
      localStorage.setItem('keys', JSON.stringify(this.#keys));
    }
    localStorage.removeItem(key);
  }

  /* Removes all items from local storage. */
  clear() {
    localStorage.clear();
  }


  /* Returns item with a given key from local storage. */
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  /* Returns all items from local storage */
  getAll() {
    const stored = {};
    if (Array.isArray(this.keys)) {
      this.keys.forEach(key => {
        if (this.get(key) !== null) {
          stored[key] = this.get(key);
        }
      })
    }
    return stored;
  }

}

const storage = new Storage();

export { storage };

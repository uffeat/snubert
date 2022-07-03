/*
Data model:
state: {
  #name: '',
  data: {},
  #subscribers: []
}
*/

/* Management of a single state (i.e., "state dimension"). */
class State {
  #name
  #subscribers = []
  constructor(name) {
    this.#name = name
    this.data = null
  }

  get name() {
    return this.#name
  }

  set name(_) {
    throw new Error(`Property 'name' is read-only.`)
  }

  /* Adds subscriber callback. */
  addSubscriber(callback) {
    if (this.#subscribers.includes(callback)) {
      throw new Error(`Callback already subscribes to state '${this.name}'.`)
    }
    this.#subscribers.push(callback)
    callback(this.data)
  }

  /* Removes subscriber callback. */
  removeSubscriber(callback) {
    if (!this.#subscribers.includes(callback)) {
      throw new Error(`Callback does not subscribe to state '${this.name}'.`)
    }
    this.#subscribers = this.#subscribers.filter(c => c !== callback)
  }

  /* Updates state data and invokes notification to subscribers. */
  update(data, settings = {}) {
    // Destruct settings arg:
    const { shallowFreeze = true } = settings

    // Abort if no change:
    if (data == this.data) {
      return
    }
    // NB: data objects escape the above no-change test.
    // ... Could do an elaborate object comparison, but hardly worth it (no real harm done...).

    // Freeze data:
    if (data && shallowFreeze === true) {
      Object.freeze(data)
    }
     // NB: Complex data objects escape the above freeze ('freeze' is shallow).

    // Update data:
    this.data = data
    // Notify subscribers:
    this.#notifySubscribers()
  }

  /* Invokes subscriber callbacks for a given state. */
  #notifySubscribers(state) {
    this.#subscribers.forEach(callback => {
      callback(this.data)
    })
  }

}

/* Management of multiple states (i.e., "state dimensions"). */
class States {
  #states = {}
  constructor() {
  }

  /* Returns states. */
  get states() {
    return this.#states.keys()
  }

  /* Explicitly makes 'states' read-only. */
  set states(_) {
    throw new Error(`Property 'states' is read-only.`)
  }

  /* Adds subscriber callback to a given state. */
  addSubscriber(stateName, callback) {
    // Create state if does not exist:
    if (!(stateName in this.#states)) {
      this.#states[stateName] = new State(stateName)
    }
    this.#states[stateName].addSubscriber(callback)
  }

  get(stateName) {
    // Validate stateName:
    if (!(stateName in this.#states)) {
      throw new Error(`State with name '${stateName}' does not exist.`)
    }
    return this.#states[stateName]
  }

  /* Removes subscriber callback for a given state. */
  removeSubscriber(stateName, callback) {
    // Validate stateName:
    if (!(stateName in this.#states)) {
      throw new Error(`State with name '${stateName}' does not exist.`)
    }
    this.#states[stateName].removeSubscriber(callback)
  }

  /* Updates (and if required, creates) a given state and invokes notification to subscribers. */
  update(stateName, data, settings) {
    // Create state if does not exist:
    if (!(stateName in this.#states)) {
      this.#states[stateName] = new State(stateName)
    }
    this.#states[stateName].update(data, settings)
  }

}

const states = new States()

export { states };

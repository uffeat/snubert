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
      console.warn(`Callback already subscribes to state '${this.name}'.`);
      return
    }
    this.#subscribers.push(callback)
    callback(this.data)
  }

  /* Removes subscriber callback. */
  removeSubscriber(callback) {
    if (!this.#subscribers.includes(callback)) {
      console.warn(`Callback does not subscribe to state '${this.name}'.`);
      return
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
     // NB: Anything but simple data objects escape the above freeze ('freeze' is shallow).

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
      this.#states[stateName] = new State(stateName);
    }
    this.#states[stateName].update(data, settings);
    
  }

}

const states = new States()

/* Mixin that enables declaratory state subscriptions for the component. */
// NB: Application of this is a matter of preference; state management can also be done outside the component.
const MixinStates = Parent => {
  return class extends Parent {
    #states;
    constructor() {
      super();
    }

    /* Returns states object. */
    get states() {
      return this.#states;
    }

     /* Sets states object. */
    set states(states) {
      this.clearStates();
      this.#states = states;
      this.refreshStates();
    }

    /* Removes any previously added state subscriber callbacks. */
    clearStates() {
      if (this.#states) {
        for (const [state, callback] of Object.entries(this.#states)) {
          states.removeSubscriber(state, callbackBound)
        }
      }
    }

    /* Adds state subscriber callbacks from this.#states. */
    refreshStates() {
      if (this.#states) {
        for (const [state, callback] of Object.entries(this.#states)) {
          // Binding only takes effect if callback is a non-arrow function:
          const callbackBound = callback.bind(this);
          states.addSubscriber(state, callbackBound);
        }
      }
    }

  }

}

export { MixinStates, states };

/*
// states object as passed in from the outside (example):

'user': function(data) {
  if (data === true) {
    this.hide();
  }
  if (data === false) {
    this.show();
  }
}

// .. or (less elegant):

'user': data => {
  if (data === true) {
    myComponent.hide();
  }
  if (data === false) {
    myComponent.show();
  }
}
*/

import { states as stateController } from '../utils/states.js';

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
          stateController.removeSubscriber(state, callbackBound)
        }
      }
    }

    /* Adds state subscriber callbacks from this.#states. */
    refreshStates() {
      if (this.#states) {
        for (const [state, callback] of Object.entries(this.#states)) {
          // Binding only takes effect if callback is a non-arrow function:
          const callbackBound = callback.bind(this);
          stateController.addSubscriber(state, callbackBound);
        }
      }
    }

  }

}

export { MixinStates };

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

import { states as stateController } from '../utils/states.js';

/* . */
const MixinStates = Parent => {
  return class extends Parent {
    #states;
    constructor() {
      super();
    }

    get states() {
      return this.#states;
    }

    set states(states) {
      /*
      // states (example):
  
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

      this.clearStates();
      this.#states = states;
      this.refreshStates();
    }

    /* Removes any previously set state subscriptions. */
    clearStates() {
      if (this.#states) {
        for (const [state, callback] of Object.entries(this.#states)) {
          stateController.removeSubscriber(state, callbackBound)
        }
      }
    }

    /* Removes any previously set state subscriptions */
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

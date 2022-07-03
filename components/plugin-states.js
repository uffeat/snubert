import { states } from '../utils/states.js';

/* . */
class PluginStates {
  
  get states() {
    return this._states;
  }

  set states(value) {
    // TODO: Remove any previously set state subscriptions.
    this._state = states
    this._states = value;
    for (const [state, callback] of Object.entries(this._states)) {
      // TODO: Do something with callback so that it understands 'this'.
      this._state.addSubscriber(state, callback)
    }
  }

}

export { PluginStates };
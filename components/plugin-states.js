import { states as stateController } from '../utils/states.js';

/* . */
class PluginStates {

  get states() {
    return this._states;
  }


  set states(arg) {
    /*
    arg (example):

    'user': function(data) {
      if (data === true) {
        this.hide();
      }
      if (data === false) {
        this.show();
      }
    }

    .. or:

    'user': data => {
      if (data === true) {
        cLoginLink.hide();
      }
      if (data === false) {
        cLoginLink.show();
      }
    }
    */

    this._stateController = stateController;

    // TODO: Remove any previously set state subscriptions.

    this._states = arg

    if (this._states) {
      for (const [state, callback] of Object.entries(this._states)) {
        // Binding only takes effect if callback is a non-arrow function:
        const callbackBound = callback.bind(this)
        this._stateController.addSubscriber(state, callbackBound)
      }
    }
  }

}

export { PluginStates };

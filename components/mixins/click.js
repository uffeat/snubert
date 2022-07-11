import { categorize } from "../utils/categorize.js";

/* Mixin that enables setting a (single) click handler for the component via the 'onClick' property. */
// NB: Purely for conveniece; does nothing that an "outside" 'addEventListener' cannot do.
const Click = Parent => {
  // Use named class to be able to explicitly reference the class from inside (see 'categorize').
  class _Click extends Parent {
    #onClick;
    constructor() {
      super();
      // Register meta information about mixin (registers in Base):
      this._inheritsFrom?.push('Click');
      if (this._propertiesWithGetter && this._methods) {
        const CategorizedPropertiesForMixin = categorize(_Click.prototype);
        this._propertiesWithGetter = [
          ...this._propertiesWithGetter, 
          ...CategorizedPropertiesForMixin.propertiesWithGetter
        ];
        this._methods = [
          ...this._methods,
          ...CategorizedPropertiesForMixin.methods
        ];
      }
    }

    /* Returns click handler. */
    get onClick() {
      return this.#onClick;
    }
  
    /* Sets click handler. */
    set onClick(handler) {
      // Remove any existing generic click listener:
      if (this.#onClick) {
        this.removeEventListener('click', this.#onClick);
      }
      else if (handler) {
        this.#onClick = handler.bind(this);
        this.addEventListener('click', this.#onClick);
      }
    }

  }
  return _Click;
}

export { Click };

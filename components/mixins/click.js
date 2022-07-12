/* Mixin that enables setting a (single) click handler for the component via the 'onClick' property. */
// NB: Purely for conveniece; does nothing that an "outside" 'addEventListener' cannot do.
const MixinClick = Parent => {
  // Use named class to be able to explicitly reference the class from inside (see 'categorize').
  class Click extends Parent {
    static requiredMixins = [];  // Applied in mixin function (mixin.js).
    #onClick;
    constructor() {
      super();
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
  // Named class is returned explicitly (rather than 'return class...' in the beginning of the mixin function)
  // to allow for any processing of the class before return.
  return Click;
}

export { MixinClick };

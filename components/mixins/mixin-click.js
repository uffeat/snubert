/* Mixin that enables setting a (single) click handler for the component via the 'onClick' property. */
// NB: Purely for conveniece; does nothing that an "outside" 'addEventListener' cannot do.
const MixinClick = Parent => {
  const MixinClass =  class extends Parent {
    #onClick;
    constructor() {
      super();
    }

    get onClick() {
      return this.#onClick;
    }
  
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
  return MixinClass;
}

export { MixinClick };

import { focus } from '../imports.js';

/* Mixin that enables local or global focus control. */
const MixinFocus = Parent => {
  class Focus extends Parent {
    static requiredMixins = [];  // Applied in mixin function (mixin.js).
    #focusScope;
    // Bind event handlers (allows removal):
    #setFocusBound = this.#setFocus.bind(this);
    constructor() {
      super();
      // Check that client class observed attribute 'focus-scope':
      if (!this.constructor?.observedAttributes?.includes('focus-scope')) {
        console.log(`Attribute 'focus-scope' not observed. Mixin applied without property -> attribute reflection.`);
      }
    }

    get focusScope() {
      return this.#focusScope;
    }
  
    set focusScope(arg) {
      this.#focusScope = arg;
      console.log(arg);
      if (arg) {
        this.addEventListener('click', this.#setFocusBound);
      }
      else {
        this.removeEventListener('click', this.#setFocusBound);
      }
      this.setAttribute('focus-scope', arg);
    }

    #setFocus(event) {
      //focus.set(event.target, this.getAttribute('focus-scope'));
      focus.set(this, this.focusScope);  //
    }

  }
  // Named class is returned explicitly (rather than 'return class...' in the beginning of the mixin function)
  // to allow for any processing of the class before return.
  return Focus;
}

export { MixinFocus };

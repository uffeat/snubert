import { focus } from '../imports.js';


/* Mixin that enables local or global focus control. */
const MixinFocus = Parent => {
  return class extends Parent {
    #focusScope;
    // Bind event handlers (allows removal):
    #setFocusBound = this.#setFocus.bind(this);
    constructor() {
      super();
      if (!this.constructor?.observedAttributes?.includes('focus-scope')) {
        console.log(`'focus-scope' not observed attribute. Mixin applied without attribute reflection.`);
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
      //focus.set(event.target, this.focusScope);
      console.log(this, this.focusScope);  //
      focus.set(this, this.focusScope);
    }

  }
}

export { MixinFocus };

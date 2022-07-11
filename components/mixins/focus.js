import { focus } from '../imports.js';
import { categorize } from "../utils/categorize.js";


/* Mixin that enables local or global focus control. */
const Focus = Parent => {
  class _Focus extends Parent {
    #focusScope;
    // Bind event handlers (allows removal):
    #setFocusBound = this.#setFocus.bind(this);
    constructor() {
      super();
      if (!this.constructor?.observedAttributes?.includes('focus-scope')) {
        console.log(`'focus-scope' not observed attribute. Mixin applied without attribute reflection.`);
      }
      // Register meta information about mixin (registers in Base):
      this._inheritsFrom?.push('Focus');
      if (this._propertiesWithGetter && this._methods) {
        const CategorizedPropertiesForMixin = categorize(_Focus.prototype);
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
      focus.set(this, this.focusScope);  //
    }

  }
  return _Focus;
}

export { Focus };

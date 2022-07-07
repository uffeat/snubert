class Focus {
  #elements = {}
  /*
  Example:
  {
    'global': element0,
    'scope1': element1,
    'scope2': element2,
    ...
  }
  */
  get(scope = 'global') {
    return this.#elements[scope];
  }

  reset(scope = 'global') {
    this.get(scope) && this.get(scope).classList.remove('focus');
    this.#elements[scope] = null;
  }

  set(element, scope = 'global') {
    // Only take action if change in focus element:
    if (element !== this.get(scope)) {
      // If old focus element, remove '.focus' class:
      this.get(scope) && this.get(scope).classList.remove('focus');
      // Set new focus element:
      this.#elements[scope] = element;
      // If new focus element, add '.focus' class:
      element && element.classList.add('focus');
    }
  }

}

const focus = new Focus();


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
      if (arg !== undefined) {
        this.addEventListener('click', this.#setFocusBound);
      }
      else {
        this.removeEventListener('click', this.#setFocusBound);
      }
      this.#focusScope = arg
      this.setAttribute('focus-scope', arg);
    }

    #setFocus(event) {
      focus.set(event.target, this.getAttribute('focus-scope'));
    }

  }

}

export { MixinFocus };

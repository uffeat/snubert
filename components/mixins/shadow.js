/* Component . */
const MixinShadow = Parent => {
  class Shadow extends Parent {
    static requiredMixins = [];  // Applied in mixin function (mixin.js).
    #root;
    constructor() {
      super();
      this.#root = this.attachShadow({
        mode: 'open',
      });
    }
  
    /* Returns (light DOM) html. */
    get html() {
      return this.innerHTML;
    }
  
    /* Sets (light DOM) html. */
    set html(html) {
      this.clearHtml();
      this.innerHTML = html || ''  // To avoid showing 'undefined'.
    }
  
    /* Returns shadow root html. */
    get rootHtml() {
      return this.root.innerHTML;
    }
  
    /* Sets shadow root html. */
    set rootHtml(html) {
      while (this.root.firstChild) {
        this.root.firstChild.remove();
      }
      this.root.innerHTML = html || ''  // To avoid showing 'undefined'.
    }
  
    /* Returns shadow root. */
    get root() {
      return this.#root;
    }
  
    /* Makes shadow root read-only. */
    set root(_) {
      throw new Error(`'root' is read-only.`);
    }
  
    /* Clears component's ligth DOM HTML. */
    clearHtml() {
      while (this.firstChild) {
        this.firstChild.remove();
      }
    }
  
    /* Hides component */
    hide() {
      this.style.display = 'none';
    }
  
    /* Appends component to element. */
    mount(element, clear = true) {
      if (clear === true) {
        while (element.firstChild) {
          element.firstChild.remove();
        }
      }
      element.append(this);
    }
  
    /* Shows component. */
    show() {
      this.style.display = 'initial';
    }

  }
  // Named class is returned explicitly (rather than 'return class...' in the beginning of the mixin function)
  // to allow for any processing of the class before return.
  return Shadow;
}

export { MixinShadow };

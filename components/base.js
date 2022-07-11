import componentsStylesheet from "./components.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, componentsStylesheet];  //

/* Base class for components. Sets up shadow DOM basics and manages properties <-> attributes sync. */
class Base extends HTMLElement {
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

  /* Adds properties of Plugin classes to component (use in component constructor). */
  addPlugins(...Plugins) {
    // Plugins should be a class without constructor, without (#)private properties, and without reference to 'super'.
    // NB: In general, use mixins instead (do not have the limitations outlined above).
    Plugins.forEach(Plugin => {
      const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(Plugin.prototype)
      for (const [name, descriptor] of Object.entries(ownPropertyDescriptors)) {
        if (name !== 'constructor') {
          Object.defineProperty(this, name, descriptor);
        }
      }
    })
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

  /* Updates multiple component properties. */
  updateProperties(properties, defaults) {
    // If 'properties' arg is undefined, make it possible to apply 'defaults'.
    properties = properties || {};
    // Update 'properties' with 'defaults' (if any) without overwriting 'properties':
    if (defaults !== undefined) {
      for (const [prop, value] of Object.entries(defaults)) {
        if (!(prop in properties)) {
          properties[prop] = value;
        }
      }
    }
    // Loop through 'properties' and set component properties:
    for (const [prop, value] of Object.entries(properties)) {
      this.updateProperty(prop, value);
    }
  }

  /* Updates property if property in component. */
  updateProperty(prop, value) {
    if (!(prop in this)) {
      console.info(`Component has no property '${prop}'. New simple property will be created.`);
    }
    // Take into account that property could be write-only:
    try {
      if (this[prop] !== value)
        this[prop] = value;
    }
    catch {
      // Property is write-only. Update regardless of potential no value change:
      this[prop] = value;
    }
  }

}


export { Base };

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
    this._mixins = [];  //



    // Examples of proto: 'Base.prototype', 'this.constructor.prototype'.
    const getCategorizedProperties = proto => {
      const propertiesWithGetter = [];
      const methods = [];
      const uncategorized = [];
      Object.getOwnPropertyNames(proto)
        .filter(name => name.startsWith('_') === false)
        .forEach(name => {
          const descriptor = Object.getOwnPropertyDescriptor(proto, name);
          if (descriptor.get) {
            propertiesWithGetter.push(name);
          }
          else if (typeof (descriptor.value) === 'function') {
            const doNotRegister = ['constructor', 'attributeChangedCallback']
            !doNotRegister.includes(name) && methods.push(name);
          }
          else {
            uncategorized.push(name);
          }
        });
      return { propertiesWithGetter, methods, uncategorized };
    }

    const CategorizedPropertiesForBase = getCategorizedProperties(Base.prototype);
    const CategorizedPropertiesForClass = getCategorizedProperties(this.constructor.prototype);
    console.log(CategorizedPropertiesForBase);
    console.log(CategorizedPropertiesForClass);



    //this._propertyNames = [
    //...Object.getOwnPropertyNames(Base.prototype),
    //...Object.getOwnPropertyNames(this.constructor.prototype)
    //];

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

  /* Syncs attribute -> property. */
  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.noSyncAttributes?.includes(attr)) {
      return
    }
    /* 
    attribute -> property value interpretation logic:
    - Added no-value attribute -> set property value to true.
    - Removed no-value attribute -> set property value to false.
    - "number sting" attribute value -> set property value number.
    Any further attribute -> property value interpretation should be done in property setters with 'interpretValue()'.
    */
    // Abort if no change (prevents infinite loop caused by reflection):
    if (oldValue === newValue) {
      return;
    }
    // Get property name that correponds to attr (kebab -> camel):
    const prop = attr.split('-').map((w, i) => i ? w[0].toUpperCase() + w.slice(1) : w).join('');
    // Determine value suitable for setting prop:
    // Initially, assume that a value attributte (not representing a number) has been changed:
    let propValue = newValue;
    // ... challenge this initial assumption:
    if (oldValue === null && newValue === '') {
      // A no-value attributte has been added. This corresponds to a true property value:
      propValue = true;
    }
    else if (oldValue === '' && newValue === null) {
      // A no-value attributte has been removed. This corresponds to a false property value:
      propValue = false;
    }
    else if (isNaN(newValue) === false) {
      // A value attributte that represents a number has been changed.
      propValue = Number(newValue);
    }
    this.#updateProperty(prop, propValue);
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

  /* Returns an interpreted "version" of 'value' iterpreted according to the 'interpretation' arg. */
  // Helper method for property setters (for incomming arg and/or before setting correponsding attribute).
  interpretValue(value, interpretation) {
    // String -> Boolean, null:
    if (interpretation === 'toBoolean') {
      if (value === 'true') {
        return true;
      }
      else if (value === 'false') {
        return false;
      }
      else if (value === 'null') {
        return null;
      }
    }
    else {
      throw new Error(`interpretation '${interpretation}' not supported.`);
    }
    return value;
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

  /* Sets or removes no-value attribute from Boolean/null/undefined (property) value. */
  setNoValueAttribute(attr, value) {
    if (value === true) {
      this.setAttribute(attr, '');
    }
    else if (!value) {  // false/null/undefined.
      this.removeAttribute(attr);
    }
    else {
      throw new Error(`Expected Boolean, null or undefined. Got '${value}';`);
    }
  }

  /* Shows component. */
  show() {
    this.style.display = 'initial';
  }

  /* Sets attribute from property with automatic name interpretation. */
  // NB: For convenience; does nothing that 'setAttribute()' and 'setNoValueAttribute()' cannot do.
  syncAttribute(prop, value, interpretation) {
    const attr = this.#getObservedAttribute(prop);
    if (!interpretation) {
      this.setAttribute(attr, value);
    }
    else if (interpretation === 'noValue') {
      this.setNoValueAttribute(attr, value);
    }
    else {
      throw new Error(`Interpretation '${interpretation}' not implemented.`);
    }
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
      this.#updateProperty(prop, value);
    }
  }

  /* Returns and validates observed attr that correponds to a given property (camel -> kebab). */
  #getObservedAttribute(prop) {
    /* Helper function: Returns true if character c is upper case or contains an integer; otherwise returns false. */
    const isUpperOrInt = c => {
      const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
      const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c);
      return isUpper || isNumber;
    }
    // Get attribute name by camel -> kebab interpretation:
    const attr = prop.split('').map((c) => isUpperOrInt(c) ? '-' + c.toLowerCase() : c).join('');
    // Verify that attribute is observed:
    if (!this.constructor?.observedAttributes?.includes(attr)) {
      throw new Error(`Property '${prop}' has no corresponding observed attribute ('${attr}').`);
    }
    return attr;
  }

  /* Updates property if property in component. */
  #updateProperty(prop, value) {
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

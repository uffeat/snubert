/* Base class for components. Sets up shadow DOM basics and manages properties <-> attributes sync. */
class Base extends HTMLElement {
  #root;
  constructor() {
    super();
    this.#root = this.attachShadow({
      mode: 'open',
    });
  }





  /* Sets one or more attibutes. */
  updateAttibutes(attributes) {
    for (const [attr, value] in Object.entries(value)) {

      this.setAttribute(attr, value);
    }

  }

  /* Returns attibutes object - potentially filtered. */
  getAttibutes(kwargs = {}) {
    const { observed, noValue } = kwargs;
    const attributeNames = [...this.attributes];

    console.log(attributeNames)

    if (observed === true) {

    }
    else if (observed === false) {

    }
    const attrs = attributeNames.reduce((attrs, attribute) => {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});


    console.log(attrs)
    return attrs
  }










  /* Syncs attribute -> property. */
  attributeChangedCallback(attr, oldValue, newValue) {
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
    // NB: Any further attribute -> property value interpretation should be done in property setters with '_interpretAttributeValue(value, requiredType)'.
  }

  /* Returns root html. */
  get html() {
    return this.root.innerHTML;
  }

  /* Sets root html. */
  set html(html) {
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
      this.#updateProperty(prop, value);
    }
  }

  /* Adds properties of Plugin classes to component (use in component constructor). */
  _addPlugins(...Plugins) {
    // Plugin should be a class without constructor and without (#)private properties.
    // ... Also, cannot call 'super' to refrence Plugin.
    Plugins.forEach(Plugin => {
      const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(Plugin.prototype)
      for (const [name, descriptor] of Object.entries(ownPropertyDescriptors)) {
        if (name !== 'constructor' && name !== '_constructor') {
          Object.defineProperty(this, name, descriptor);
        }
      }
      if (Plugin.prototype._constructor) {
        Plugin.prototype._constructor();
      }
    })
  }

  /* Helper method for property setters. Performs additional attribute value interpretations not handled in 'attributeChangedCallback'. */
  _interpretAttributeValue(value, ...interpretations) {
    if (interpretations.includes('toBoolean')) {
      if (value === 'true') {
        return true
      }
      else if (value === 'false') {
        return false
      }
      else if (value === 'null') {
        return null
      }
    }
    else if (interpretations.includes('toStringArray') && Array.isArray(value)) {
      return value.split(';').map(w => w.trim().toLowerCase()).filter(w => w !== '')
    }
    else if (interpretations.includes('toNumber') && Number(value) !== NaN) {
      return Number(value);
    }
    else if (interpretations.includes('toDate') && (typeof value === 'string' || value instanceof String)) {
      // TODO!
      throw new Error(`Date interpretation not yet implemented.`);
    }
    // This (non-)interpretation should come last:
    else if (interpretations.includes('none') && (typeof value === 'string' || value instanceof String)) {
      return value
    }
    // If we get to this point, something went wrong.
    throw new Error(`Could not interpret value: '${value}'.`);
  }

  /* Syncs property -> attribute with value interpretation (to be called from property setters). */
  _syncAttribute(prop, value, ...interpretations) {
    const attr = this.#getObservedAttribute(prop);
    // No 'interpretations' -> perform default interpretation
    // (interprets booleans as adding/removing no-value attibutes and explicitly interprets numbers to strings):
    if (interpretations.length === 0) {
      if (value === true) {
        this.setAttribute(attr, '');
      }
      else if (!value) {  // false/null/undefined.
        this.removeAttribute(attr);
      }
      else if (typeof value === 'number' || value instanceof Number) {
        this.setAttribute(attr, value.toString());
      }
      else if (typeof value === 'string' || value instanceof String) {
        this.setAttribute(attr, value);
      }
      else {
        throw new Error(`Cannot interpret property value '${value}' to a suitable value for attribute '${attr}'.`);
      }
    }
    // 'interpretations' passed -> perform special interpretation:
    else if (interpretations.includes('fromBoolean') && [true, false, null].includes(value)) {
      // Perform literal interpretation of Boolean (incl. null):
      if (value === true) {
        this.setAttribute(attr, 'true');
      }
      else if (value === false) {
        this.setAttribute(attr, 'false');
      }
      else if (value === null) {
        this.setAttribute(attr, 'null');
      }
    }
    else if (interpretations.includes('fromNumber') && Number(value) !== NaN) {
      this.setAttribute(attr, value.toString());
    }
    else if (interpretations.includes('fromStringArray') && Array.isArray(value)) {
      this.setAttribute(attr, value.map(w => w.trim()).join(';'));
    }
    else if (interpretations.includes('fromDate') && (typeof value === 'date' || value instanceof Date)) {
      this.setAttribute(attr, value.toString());  // TODO: Format date.
    }
    // This (non-)interpretation should come last:
    else if (interpretations.includes('none')) {
      this.setAttribute(attr, value);
    }
    else {
      throw new Error(`Could not interpret value '${value}' with interpretations '${interpretations}'.`);
    }
  }

  /* Returns and validates observed attr that correponds to a given property (camel -> kebab). */
  #getObservedAttribute(prop) {

    /* Returns true if character c is upper case or contains an integer; otherwise returns false. */
    const isUpperOrInt = c => {
      const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
      const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c);
      return isUpper || isNumber;
    }

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
      console.warn(`Component has no property '${prop}'. New property created and set.`);
    }
    this[prop] = value;
  }

}

export { Base };

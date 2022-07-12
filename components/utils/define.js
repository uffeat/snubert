const tagNamePrefix = 'snu';
// WARNING: Do not change; tage names may be used for identifiying components elsewhere.

/* Returns true if character 'c' is either upper case or contains an integer. */
// Helper for 'pascalToKebab'.
const isUpperOrNumber = c => {
  const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
  const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)
  return isUpper || isNumber;
}

/* Returns kebab-case representation of Pascal-case string. */
// Helper for 'define'.
const pascalToKebab = pascal => {
  return pascal.split('').map(
    (c, i) => isUpperOrNumber(c) && i > 0 ? '-' + c.toLowerCase() : c.toLowerCase()
  ).join('');
}

/* Registers custom element with tag name derived from component class name. */
const define = ComponentClass => {
  // Derive tag name from component name and add tag name directly onto component class (static property);
  // for use in 'snubert.createComponent':
  ComponentClass._tagName = tagNamePrefix + '-' + pascalToKebab(ComponentClass.name);
  if (!customElements.get(ComponentClass._tagName)) {


    // Component classes should contain the static property '_extends' with a value of either 
    // null or the element name to extend (e.g., 'button).
    // If this is forgotten, the following automatically adds the static property '_extends' to the
    // component classes with the corerrct value:
    if (ComponentClass._extends === undefined) {
      if (ComponentClass.prototype instanceof HTMLAnchorElement) {
        ComponentClass._extends = 'a';
      }
      else if (ComponentClass.prototype instanceof HTMLButtonElement) {
        ComponentClass._extends = 'button';
      }
      else {
        ComponentClass._extends = null;
      }
    }

    if (ComponentClass._extends) {
      customElements.define(ComponentClass._tagName, ComponentClass, { extends: ComponentClass._extends });
    }
    else {
      customElements.define(ComponentClass._tagName, ComponentClass);
    }
  }
  else {
    console.warn(`Custom element with tag name '${ComponentClass._tagName}' already defined.`);
  }
}

export { define };

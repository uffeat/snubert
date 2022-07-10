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
  // For use in 'snubert.createComponent':
  ComponentClass._tagName = tagNamePrefix + '-' + pascalToKebab(ComponentClass.name);
  if (!customElements.get(ComponentClass._tagName)) {
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

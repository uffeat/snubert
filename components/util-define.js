// Custom element tag name prefix (DO NOT CHANGE since tage name may be used for identifiying components):
const prefix = 'snu'

/* Returns kebab-case representation of Pascal-case string. */
const pascalToKebab = pascal => {

  /* Returns true if character 'c' is either upper case or contains an integer. */
  const isUpperOrNumber = c => {
    const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
    const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)
    return isUpper || isNumber
  }

  return pascal.split('').map(
    (c, i) => isUpperOrNumber(c) && i > 0 ? '-' + c.toLowerCase() : c.toLowerCase()
  ).join('')
}

/* Registers custom element with tag name derived from component class name. */
const utilDefine = Component => {
  const tagName = prefix + '-' + pascalToKebab(Component.name)
  !customElements.get(tagName) && customElements.define(tagName, Component)
}

export { utilDefine };

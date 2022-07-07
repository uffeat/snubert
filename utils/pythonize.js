const pythonize = Class => {

  /* Helper. */
  const camelToSnake = word => {
    const isUpperOrNumber = c => {
      const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90
      const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)
      return isUpper || isNumber
    }
    return word.split('').map((c) => isUpperOrNumber(c) ? '_' + c.toLowerCase() : c).join('')
  }

  const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(Class.prototype);

  for (const [name, descriptor] of Object.entries(ownPropertyDescriptors)) {
    const newName = camelToSnake(name);
    Object.defineProperty(Class.prototype, newName, descriptor);
  }
}

export { pythonize };
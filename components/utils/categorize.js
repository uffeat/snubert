/* */
// Examples of proto: 'Base.prototype', 'this.constructor.prototype'.
const categorize = proto => {
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

export { categorize };

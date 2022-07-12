/* Component mixin for managing properties. */
const MixinProps = Parent => {
  class Props extends Parent {
    static requiredMixins = [];  // Applied in mixin function (mixin.js).
    constructor() {
      super();
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
  // Named class is returned explicitly (rather than 'return class...' in the beginning of the mixin function)
  // to allow for any processing of the class before return.
  return Props;
}

export { MixinProps };

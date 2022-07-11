import { categorize } from "../utils/categorize.js";  //

/* Component mixin for managing added elements. */
const MixinAttrs = Parent => {

  

  class CompositeAttrs extends Parent {
    // Capture client class ("the component class") in static property:
    static requiredMixins = ['_Slots'];
    constructor() {
      super();

      // // TODO: Turn into imported function:
      if (this.constructor.mixins) {
        this.constructor.mixins.push('Attrs');
      }
      else {
        this.constructor.mixins = ['Attrs'];
      }

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
      this.updateProperty(prop, propValue);
    }

    /* Returns and validates observed attr that correponds to a given property (camel -> kebab). */
    getObservedAttribute(prop) {
      /* Helper function: Returns true if character c is upper case or contains an integer; otherwise returns false. */
      const isUpperOrInt = c => {
        const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
        const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c);
        return isUpper || isNumber;
      }
      // Get attribute name by camel -> kebab interpretation:
      const attr = prop.split('').map((c) => isUpperOrInt(c) ? '-' + c.toLowerCase() : c).join('');
      // Verify that attribute is observed:
      if (!this.constructor.observedAttributes?.includes(attr)) {
        throw new Error(`Property '${prop}' has no corresponding observed attribute ('${attr}').`);
      }
      return attr;
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

    /* Sets attribute from property with automatic name interpretation. */
    // NB: For convenience; does nothing that 'setAttribute()' and 'setNoValueAttribute()' cannot do.
    syncAttribute(prop, value, interpretation) {
      const attr = this.getObservedAttribute(prop);
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

  }

  return CompositeAttrs;
}

export { MixinAttrs };

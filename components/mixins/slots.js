import { categorize } from "../utils/categorize.js";

/* Component mixin for managing added elements. */
const Slots = (Parent = class {}) => {
  class _Slots extends Parent {
    constructor() {
      super();
      // Register meta information about mixin (registers in Base):
      this._mixins?.push('Slots');
      if (this._propertiesWithGetter && this._methods) {
        const CategorizedPropertiesForMixin = categorize(_Slots.prototype);
        this._propertiesWithGetter = [
          ...this._propertiesWithGetter, 
          ...CategorizedPropertiesForMixin.propertiesWithGetter
        ];
        this._methods = [
          ...this._methods,
          ...CategorizedPropertiesForMixin.methods
        ];
      }
    }

    /* Adds element to a given slot. */
    addElement(element, kwargs = {}) {
      const { clear = false, index, slot = '' } = kwargs;
      clear && this.clearSlot(slot);
      this.#getSlotElement(slot)  // To validate slot.
      if (index) {
        element.setAttribute('x-index', index);
      }
      // Append element:
      if (typeof element === 'string' || element instanceof String) {
        const text = element;
        element = document.createElement('p');
        element.textContent = text;
      }
      // TODO: Handle index
      element.slot = slot;
      this.append(element);
    }

    /* Adds one or more elements to a given slot. */
    addElements({ clear = false, slot = '' }, ...elements) {
      clear && this.clearSlot(slot);
      elements.forEach(element => this.addElement(element, { clear: false, slot }));
    }

    /* Set callback to be invoked whenever nodes are added. Callback arg: Array of added nodes. */
    addAddedNodesCallback(callback, filterFunction) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          let nodes = [...mutation.addedNodes];
          if (filterFunction) {
            nodes = nodes.filter(filterFunction);
          }
          callback(nodes);
          observer.disconnect();
        })
      })
      observer.observe(this, { childList: true });
    }

    /* Set callback to be invoked whenever nodes are removed. Callback arg: Array of removed nodes. */
    addRemovedNodesCallback(callback, filterFunction) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          let nodes = [...mutation.removedNodes];
          if (filterFunction) {
            nodes = nodes.filter(filterFunction);
          }
          callback(nodes);
          observer.disconnect();
        })
      })
      observer.observe(this, { childList: true });
    }

    /* Adds slot change event handler to a given slot. */
    addSlotChangeHandler(slot, handler) {
      const eSlot = this.#getSlotElement(slot);
      eSlot.addEventListener('slotchange', handler);
    }

    /* Removes added elements. */
    clearSlot(slot = '') {
      this.#getSlotElement(slot);  // To validate slot.
      this.getAddedElements(slot).forEach(element => element.remove());
    }

    /* Returns elements added to slot. */
    getAddedElements(slot = '') {
      return this.#getSlotElement(slot).assignedElements();
    }

    /* Returns array of slot names.*/
    getSlotNames() {
      // NB: The value of an unnamed slot's 'name' attribute is ''.
      return [...this.root.querySelectorAll('slot')].map(element => element.name);
    }

    /* Returns slot element by name. Throws exception if slot not found. */
    #getSlotElement(slot = '') {
      const eSlot = this.root.querySelector(slot === '' ? `slot:not([name])` : `slot[name="${slot}"]`);
      if (!eSlot) {
        throw new Error(`No slot with name '${slot}'.`);
      }
      return eSlot;
    }

  }
  return _Slots
}

export { Slots };

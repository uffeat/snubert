/* Component mixin for managing added elements. */
const MixinSlots = Parent => {
  return class extends Parent {
    constructor() {
      super();
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

    /* Set callback to be invoked whenever nodes are added. Callback arg: Array of added nodes. */
    setAddedNodesCallback(callback, filterFunction) {
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
    setRemovedNodesCallback(callback, filterFunction) {
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


    /* Returns slot element by name. Throws exception if slot not found. */
    #getSlotElement(slot = '') {
      const eSlot = this.root.querySelector(slot === '' ? `slot:not([name])` : `slot[name="${slot}"]`);
      if (!eSlot) {
        throw new Error(`No slot with name '${slot}'.`);
      }
      return eSlot;
    }

  }

}


export { MixinSlots };

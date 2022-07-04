/* Component plugin for managing added components. */
class PluginSlots {
  
  /* Adds element to a given slot. */
  addElement(element, kwargs = {}) {
    const { clear = false, index, slot = '' } = kwargs
    clear && this.clearSlot(slot)
    this._getSlotElement(slot)  // To validate slot.
    if (index) {
      element.setAttribute('x-index', index)
    }
    // Append element:
    if (typeof element === 'string' || element instanceof String) {
      const text = element
      element = document.createElement('p')
      element.textContent = text
    }
    // TODO: Handle index
    element.slot = slot
    this.append(element)
  }

  /* Adds one or more elements to a given slot. */
  addElements({ clear = false, slot = '' }, ...elements) {
    clear && this.clearSlot(slot)
    elements.forEach(element => this.addElement(element, { clear: false, slot }))
  }

  /* Removes added elements. */
  clearSlot(slot = '') {
    this._getSlotElement(slot)  // To validate slot.
    this.getAddedElements(slot).forEach(element => element.remove())
  }

  /* Returns elements added to slot. */
  getAddedElements(slot = '') {
    return this._getSlotElement(slot).assignedElements()    
  }

  /* Returns array of slot names.*/
  getSlotNames() {
    // NB: The value of an unnamed slot's 'name' attribute is ''.
    return [...this.root.querySelectorAll('slot')].map(element => element.name)
  }

  /* Passes on array of added or removed elements to callback, whenever elements are added/removed. */
  _addObserver(mutationType, callback, kwargs = {}) {
    const { observed = this, subtree = false } = kwargs
    if (!['addedNodes', 'removedNodes'].includes(mutationType)) {
      throw new Error(`Invalid mutation type: '${mutationType}'.`)
    }
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        callback([...mutation[mutationType]])
        observer.disconnect()
      })
    })
    observer.observe(observed, { childList: true, subtree })
  }

  /* Passes on array of added or removed elements to callback, whenever elements are added/removed. */
  _setClassChangeCallback(callback) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          callback()
        }
        observer.disconnect()
      })
    })

    observer.observe(this, { attributes: true })
  }

  /* Adds slot change event handler to a given slot. */
  _addSlotChangeHandler(slot, handler) {
    const eSlot = this._getSlotElement(slot)
    eSlot.addEventListener('slotchange', handler)
  }

  /* Returns slot element by name. Throws exception if slot not found. */
  _getSlotElement(slot = '') {
    const eSlot = this.root.querySelector(slot === '' ? `slot:not([name])` : `slot[name="${slot}"]`)
    if (!eSlot) {
      throw new Error(`No slot with name '${slot}'.`)
    }
    return eSlot
  }

}

export { PluginSlots };

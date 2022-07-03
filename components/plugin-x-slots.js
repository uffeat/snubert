/* Component plugin for managing added components. */
class PluginXSlots {
  /* Adds element to a given slot. */
  injectElement(element, kwargs = {}) {
    const { clear = false, index, xSlot = '' } = kwargs

    clear && this.clearXSlot(xSlot)
    const eXSlot = this._getXSlotElement(xSlot)
    if (index) {
      element.setAttribute('x-index', index)
    }
    // Append element:
    // TODO: Handle index
    eXSlot.append(element)
  }

  /* Removes injected elements from a given xSlot. */
  clearXSlot(xSlot = '') {
    this.getInjectedElements(xSlot).forEach(element => element.remove())
  }

  /* Returns elements added to xSlot. */
  getInjectedElements(xSlot = '') {
    return this._getXSlotElement(xSlot).children
  }

  /* Returns array of slot names.*/
  getXSlotNames() {
    return [...this.root.querySelectorAll('x-slot')].map(element => element.name)
  }

  /* Returns x-slot element by name. Throws exception if x-slot not found. */
  _getXSlotElement(xSlot = '') {
    const eXSlot = this.root.querySelector(xSlot === '' ? `x-slot:not([name])` : `x-slot[name="${xSlot}"]`)
    if (!eXSlot) {
      throw new Error(`No x-slot with name '${xSlot}'.`)
    }
    return eXSlot
  }

}

export { PluginXSlots };

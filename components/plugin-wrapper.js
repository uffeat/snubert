/* Plugin for wrapping a regular added element . */
class PluginWrapper {

  /* Wraps added element in it's own shadow DOM. */
  // Requires the Slot plugin and should be used in conjunction with '_addObserver()' or '_addSlotChangeHandler()'.
  _wrap(element) {
    // Verify that element has been added to component:
    if (!this.getAddedElements(element.slot).includes(element)) {
      throw new Error(`Cannot wrap element '${element}' not added to component.`)
    }
    // Create wrapper element with shadow root:
    const eWrapper = document.createElement('x-wrapper')
    eWrapper.root = eWrapper.attachShadow({ mode: 'open' })
    // Add wrapper element to component at position just before element and withsame slot as element:
    eWrapper.slot = element.slot
    this.insertBefore(eWrapper, element)
    // Move element to wrapper element's shadow root:
    eWrapper.root.append(element)
    // Return wrapper element, e.g., for further processing:
    return eWrapper
  }

}

export { PluginWrapper };

/*
Notable (desiable) behaviour, I do not understand:
- The wrapper element is removed when the enveloped element is removed (no need to unwrap).
- 'getAddedElements()' returns the wrapped elements (not the wrapper itself).
*/

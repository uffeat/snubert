class Focus {
  #elements = {}
  /*
  Example:
  {
    'global': element0,
    'scope1': element1,
    'scope2': element2,
    ...
  }
  */
  get(scope = 'global') {
    return this.#elements[scope];
  }

  reset(scope = 'global') {
    this.get(scope) && this.get(scope).classList.remove('focus');
    this.#elements[scope] = null;
  }

  set(element, scope = 'global') {
    // Only take action if change in focus element:
    if (element !== this.get(scope)) {
      // If old focus element, remove '.focus' class:
      this.get(scope) && this.get(scope).classList.remove('focus');
      // Set new focus element:
      this.#elements[scope] = element;
      // If new focus element, add '.focus' class:
      element && element.classList.add('focus');
    }
  }

}

const focus = new Focus();

export { focus };

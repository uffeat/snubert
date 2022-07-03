/* . */
class PluginClick {

  get onClick() {
    return this._onClick
  }

  set onClick(value) {
    // Remove any existing generic click listener:
    if (this._onClick) {
      this.removeEventListener('click', this._onClick)
    }
    else if (value) {
      this._onClick = value.bind(this)
      this.addEventListener('click', this._onClick)
    }
  }

}

export { PluginClick };

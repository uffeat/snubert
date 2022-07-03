import * as components from './components/all/all.js'
import { modal } from './components/modal.js'
import { callWorker } from './utils/call-worker.js'
import { createElement } from './utils/elements.js'
import { focus } from './utils/focus.js'
import { states } from './utils/states.js'
import { storage } from './utils/storage.js'
import { theme } from './utils/theme.js'

/* Class for the 'snubert' namespace. */
class Snubert {
  #eRoot
  constructor() {
    this.callWorker = callWorker
    this.components = components
    this.createElement = createElement
    this.focus = focus
    this.modal = modal
    this.states = states
    this.storage = storage
    this.theme = theme
  }

  get eRoot() {
    if (!this.#eRoot) {
      throw new Error(`Root element not set. Use 'setRoot(element)' to set root element.`)
    }
    return this.#eRoot
  }

  set eRoot(value) {
    throw new Error(`Property 'eRoot' is read-only. Use 'setRoot(element)' to set root element.`)
  }

  createComponent(Component, properties, kwargs = {}) {
    return new window.snubert.components[Component](properties, kwargs)
  }

  setRoot(element) {
    if (!element) {
      console.info(`Creating root component...`)
      element = this.createComponent('Root')
      document.body.append(element)
    }
    this.#eRoot = element
  }

}


const snubert = new Snubert()
window.snubert = snubert

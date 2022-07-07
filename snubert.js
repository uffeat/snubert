import normalizeStylesheet from "./styles/normalize.css" assert { type: "css" };
import mainStylesheet from "./styles/main.css" assert { type: "css" };
import * as components from './components/all.js';
import * as utils from './utils/all.js';

/* Class for the 'snubert' namespace. */
class Snubert {
  #eRoot;
  #source;
  constructor() {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalizeStylesheet, mainStylesheet]

    this.components = components;
    this.modal = components.modal;

    for (const [prop, value] of Object.entries(utils)) {
      this[prop] = value;
    }
  }

  get eRoot() {
    if (!this.#eRoot) {
      throw new Error(`Snubert root element not set. Use 'setRoot(element)' to set root element.`);
    }
    return this.#eRoot;
  }

  set eRoot(_) {
    throw new Error(`Property 'eRoot' is read-only. Use 'setRoot(element)' to set root element.`);
  }

  createComponent(Component, properties, kwargs = {}) {
    return new this.components[Component](properties, kwargs);
  }

  setRoot(element) {
    if (!element) {
      console.info(`Creating root element...`);
      element = document.createElement('div');
      element.id = 'root';
      document.body.append(element);
    }
    this.#eRoot = element;
  }

}

const snubert = new Snubert();
window.snubert = snubert;

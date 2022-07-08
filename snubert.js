import normalizeStylesheet from "./styles/normalize.css" assert { type: "css" };
import * as components from './components/all.js';
import * as utils from './utils/all.js';
import { focus } from './components/mixins/mixin-focus.js';
import { states } from './components/mixins/mixin-states.js';
import { pythonize } from './utils/pythonize.js';
import { ModalContent } from './components/modal-content.js';

/* Class for the 'snubert' namespace. */
class Snubert {
  #root;
  constructor() {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalizeStylesheet]
    this.components = components;
    this.focus = focus;
    this.states = states;
    // Add utility functions:
    for (const [prop, value] of Object.entries(utils)) {
      this[prop] = value;
    }
  }

  get root() {
    if (!this.#root) {
      throw new Error(`Snubert root element not set. Use 'setRoot(element)' to set root element.`);
    }
    return this.#root;
  }

  set root(_) {
    throw new Error(`Property 'root' is read-only. Use 'setRoot(element)' to set root element.`);
  }

  modal({ buttons, callback, headline }) {
    const cModal = this.createComponent('Modal');
    const cModalContent = new ModalContent({ buttons, headline })
    cModal.append(cModalContent)
    cModal.show();

    return new Promise(resolve => {
      const eeControlButtons = cModalContent.root.querySelectorAll('button.control')
      eeControlButtons.forEach(element => element.addEventListener('click', event => {
        let value = event.target._value;
        console.log(value)
        cModal.hide();
        callback && callback(value);
        resolve(value);
      }));
    });
  }

  createComponent(Component, properties) {
    return new this.components[Component](properties);
  }

  createElement(tagName, kwargs = {}) {
    const element = document.createElement(tagName)
    for (const [key, value] of Object.entries(kwargs)) {
      element[key] = value;
    }
    return element;
  }

  setRoot(element) {
    if (!element) {
      console.info(`Creating root element...`);
      element = document.createElement('div');
      element.id = 'root';
      document.body.append(element);
    }
    this.#root = element;
  }

}

pythonize(Snubert);

const snubert = new Snubert();
window.snubert = snubert;

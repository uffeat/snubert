import normalizeStylesheet from "./styles/normalize.css" assert { type: "css" };
import mainStylesheet from "./styles/main.css" assert { type: "css" };
import * as components from './components/all.js';
import * as utils from './utils/all.js';
import { ModalContent } from './components/modal-content.js';

/* Class for the 'snubert' namespace. */
class Snubert {
  #root;
  constructor() {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalizeStylesheet, mainStylesheet]
    this.components = components;
    // Add utiliies:
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

  modal({ buttons, callback, dismissible = false, headline, text }) {
    const cModal = this.createComponent('Modal', {dismissible});
    const cModalContent = new ModalContent({ buttons, dismissible, headline, text })
    cModal.append(cModalContent)
    cModal.show();

    return new Promise(resolve => {
      const eeControlButtons = cModalContent.root.querySelectorAll('button.control')
      eeControlButtons.forEach(element => element.addEventListener('click', event => {
        // 'event.target._value' avoids conversion of to string (as 'event.target.value' would).
        cModal.hide();
        callback && callback(event.target._value);
        resolve(event.target._value);
      }));
    });
  }

  createComponent(ComponentClassName, properties) {
    let component =  new this.components[ComponentClassName](properties);

    const ComponentClass = this.components[ComponentClassName];
   

    // TODO: No need to instantiate component (above) when only its '_elementType' and '_tagName' is needed...
    if (ComponentClass._extends) {
      const _component = document.createElement(ComponentClass._extends);
      _component.setAttribute('is', ComponentClass._tagName);
      component = _component;
    }
    return component;
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

const snubert = new Snubert();
window.snubert = snubert;

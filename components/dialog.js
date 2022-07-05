import { Base } from './base.js';
import { utilDefine } from './util-define.js';
import { PluginSlots } from './plugin-slots.js';

// TODO: Use dialog HTML element.
// TODO: Implement reflection.

/* . */
// Control buttons can be added by the result slot mechanism (slot="footer") or with 'addButton()'/'addButtons()'.
class Modal extends Base {
  #callback;
  #closeOnButtonClick = true;
  #dismissible;
  #open;
  #value = null;
  // Define and bind event handlers (for the binding itself and to enable removal):
  #onCloseButtonClickBound = this.#onCloseButtonClick.bind(this);
  #onWrapperClickBound = this.#onWrapperClick.bind(this);
  constructor(properties) {
    super();
    this.addPlugins(PluginSlots);
    this.html = /*html*/ `
    <style>
      :host {
        z-index: var(--zIndexMax, 99);
      }

      x-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: calc(var(--zIndexMax, 99) - 1);
        background-color: rgb(0, 0, 0, 0.5);
      }
      
      x-container {
        position: absolute;
        top: max(30%, 100px);
        left: calc(50% - 100px);
        width: fit-content;
        min-width: 400px;
        max-width: 600px;
        min-height: 120px;
        z-index: var(--zIndexMax, 99);
        padding: 8px 8px 8px 16px;
        display: flex;
        flex-direction: column;
        background-color: var(--gray300, lightGray);
        box-shadow: var(--boxShadow1);
      }

      header {
        display: flex;
        align-items: flex-start;
      }

      header .headline {
        color: black; /* */
        font-family: var(--fontFamily);
        font-size: 20px;
        font-weight: 500;
        padding: 0;
        margin: 4px 0 4px 0;
      }

      header button {
        display: none;
        margin-left: auto;
        background-color: transparent;
        border: none;
      }

      :host([dismissible]) header button {
        display: initial;
      }

      header button>svg {
        width: 18px;
        height: 18px;
      }

      header button>svg>path {
        fill: var(--gray600, gray);
        stroke: transparent;
        transition: fill 200ms;
      }

      header button:hover>svg>path {
        fill: black;
      }

      main {
        flex-grow: 1;
        padding: 0;
        margin: 0px 8px;
      }

      /* TODO! */
      main p {
        color: red;
      }

      footer {
        display: flex;
        justify-content: flex-end;
        column-gap: 8px;
      }

      footer button {
        color: black; /* */
        font-family: var(--fontFamily);
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 8px 12px;
        border: none;
        outline: none;
        background-color: transparent;
      }

      footer button:hover {
        background-color: var(--primaryColor100, pink);
      }
    </style>
    <x-wrapper>
      <x-container>
        <header>
          <h3 class="headline"></h3>
          <button title="Dismiss">
            <svg viewBox="0 0 24 24">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
         <slot name="footer"></slot>
        </footer>
      </x-container>
    </x-wrapper>
    `;
    // Default values for properties with actions in setters should be set via 'defaults' (second arg in updateProperties)
    // ... rather than directlt on private field declarration (e.g., '#open = false'):
    this.updateProperties(properties, {dismissible: false,  open: false });
  }

  static get observedAttributes() {
    return ['dismissible', 'headline', 'open'];
  }

  /* Returns array of control (footer) button specifications. */
  get buttons() {
    throw new Error(`Property 'buttons' is write-only.`);
  }

  /* Sets control (footer) button specification array. */
  set buttons(value) {
    this.#addButtons(value);
  }

  /* Returns callback (invoked when a control button is clicked). */
  get callback() {
    return this.#callback;
  }

  /* Returns callback (invoked when a control button is clicked). Callback should take a single value arg (the value of the modal). */
  set callback(value) {
    this.#callback = value;
  }

  /* Returns flag that controls if modal should close when a control button in clicked. */
  get closeOnButtonClick() {
    return this.#closeOnButtonClick;
  }

  /* Sets flag that controls if modal should close when a control button in clicked. */
  set closeOnButtonClick(value) {
    this.#closeOnButtonClick = value;
  }

  /* Returns modal (main) content. */
  get content() {
    return this.getAddedElements('main');
  }

  /* Sets modal (main) content. */
  set content(value) {
    if (typeof value === 'string' || value instanceof String) {
      const eText = document.createElement('p');
      eText.textContent = value;
      this.root.querySelector('main').append(eText)
    }
    else {
      this.append(value);
    }
  }

  /* Returns flag that controls if modal is dissmissible (top close button shown and click outside modal closes modal with value = null). */
  get dismissible() {
    return this.#dismissible;
  }

  /* Sets flag that controls if modal is dissmissible (top close button shown and click outside modal closes modal with value = null). */
  set dismissible(value) {
    if (value === true) {
      this.setAttribute('dismissible', '');
      this.root.querySelector('x-wrapper').addEventListener('click', this.#onWrapperClickBound);
      this.root.querySelector('header button').addEventListener('click', this.#onCloseButtonClickBound);
    }
    else if (value === false) {
      this.removeAttribute('dismissible');
      this.root.querySelector('x-wrapper').removeEventListener('click', this.#onWrapperClickBound);
      this.root.querySelector('header button').removeEventListener('click', this.#onCloseButtonClickBound);
    }
    this.#dismissible = value;
    this.propertyChangeCallback('dismissible', value);
  }

  /* Returns modal headline. */
  get headline() {
    return this.getAttribute('headline');  // TODO: Replace with #headline
  }

  /* Sets modal headline. */
  set headline(value) {
    value = value || '';
    this.root.querySelector('.headline').textContent = value;
    this.propertyChangeCallback('headline', value);
  }

  /* Returns flag that controls if modal should open. */
  get open() {
    return this.#open;
  }

  /* Set flag that controls if modal should open. */
  set open(value) {
    this.#open = value;
    if (value === true) {
      this.show();
    }
    else {
      this.style.display = 'none';
    }
    this.propertyChangeCallback('open', value);
  }

  /* Returns value of modal (as set via control buttons). */
  get value() {
    return this.#value;
  }

  /* Makes 'value' read-only. */
  set value(_) {
    throw new Error(`Property 'value' is read-only.`);
  }

  /* Adds control button (to footer). */
  #addButton(text, value, title) {
    const eButton = document.createElement('button');
    eButton.textContent = text;
    eButton.value = value;
    // 'eButton.value' is string (by implicit conversion). This is taken into account in 'show()' by calling '._interpretAttributeValue()'.
    title && eButton.setAttribute('title', title);
    this.root.querySelector('footer').append(eButton);
    
  }

  /* Adds multiple control buttons (to footer). */
  #addButtons(buttons) {
    // Remove any previously added buttons (also removes their event handlers):
    this.root.querySelectorAll('footer button').forEach(element => element.remove())
    // Add buttons:
    buttons.forEach(item => {
      const [text, value, title] = item;
      this.#addButton(text, value, title);
    })
  }

  /* Shows modal and returns the modals value (determined by control buttons) via a promise
   and potentially also the callback (set by the 'callback' property). */
  // Overloads method inherited from 'Base'.
  show() {
    !this.parentElement && document.body.append(this);
    this.style.display = 'initial';
    // Control buttons may reside in 'button[slot="footer"]' (if added via HTML or with 'addElement' etc.)
    // or in 'footer' (if added via the 'buttons' property):
    const eeControlButtons = [
      ...this.querySelectorAll('button[slot="footer"]'),
      ...this.root.querySelectorAll('footer > button')
    ];
    return new Promise(resolve => {
      eeControlButtons.forEach(element => element.addEventListener('click', event => {
        // 'event.target.value' is a string, so perform interpretation:
        this.#value = this.interpretAttributeValue(event.target.value, 'toBoolean', 'toNumber', 'none');
        this.callback && this.callback(this.#value);
        resolve(this.#value);
        this.closeOnButtonClick && this.remove();
      })
      )
    })
  }

  /* Event handler for top close button click
  (called via 'this.#onCloseButtonClickBound()' and added\removed via the 'dismissible' property). */
  #onCloseButtonClick(event) {
    this.remove();
  }

  /* Event handler for wrapper click
  (called via 'this.#onWrapperClickBound()' and added\removed via the 'dismissible' property). */
  #onWrapperClick(event) {
    if (event.target === event.currentTarget) {
      this.remove();
    }
  }

}

/* Factory function for conveniece. */
const modal = async (properties, callback) => {
  const cModal = new Modal(properties)
  const value = await cModal.show();
  if (callback) {
    callback(value);
  }
  return value;
}

utilDefine(Modal);

export { Modal, modal };

/*
How to use Modal (two possible ways)
-----------------------------------
1. With await:
// Create modal:
const cModal = window.snubert.createComponent('Modal', {
  headline: "My modal",
  content: "Content",
  buttons: [["OK", true], ["Cancel", false]],
  open: false
})

// Open modal and get it's value when it closes:
await cModal.show()
console.log(cModal.value)

// ... Alternatively:
// Open modal and get it's value when it closes:
const modalValue = await cModal.show()
console.log(modalValue)

2. With callback:
window.snubert.createComponent('Modal', {
  headline: "My modal",
  content: "Content",
  buttons: [["OK", true], ["Cancel", false]],
  callback: value => console.log(value)
})
*/

/*
How to use modal (two possible ways)
-----------------------------------
1. With await:
const modal = window.snubert.modal({
  headline: "My modal",
  content: "Content",
  buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
  dismissible: true,
})
console.log(await modal)


2. With callback:
const modal = window.snubert.modal({
  headline: "My modal",
  content: "Content",
  buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
  dismissible: true,
}, value => console.log(value))

*/

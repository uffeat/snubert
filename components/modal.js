import { Base } from './base.js';
import { mixin } from './utils/mixin.js';
import { define } from './utils/define.js';
import { MixinSlots } from './mixins/mixin-slots.js';

/* Bare-bones modal component. */
class Modal extends mixin(Base, MixinSlots) {
  #dismissible;
  #open;
  // Define and bind event handlers (for the binding itself and to enable removal):
  #onBackgroundClickBound = this.#onBackgroundClick.bind(this);
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <style>
      :host {
        z-index: var(--zIndexMax, 99);
        /* Use var for width since used in calcs: */
        --width: 400px;
      }

     x-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: calc(var(--zIndexMax, 99) - 1);
        background-color: rgb(0, 0, 0, 0.5);
      }
      
      x-modal {
        position: absolute;
        top: max(30%, 100px);
        left: calc(50% - var(--width)/2);
        width: 400px;
        z-index: var(--zIndexMax, 99);
        
        display: flex;
        flex-direction: column;
        background-color: var(--gray300, lightGray);
        box-shadow: var(--boxShadow1);
      }
    </style>
    <x-background>
      <x-modal>
        <slot></slot>
      </x-modal>
    </x-background>
    `;
    // Default values for properties with actions in setters should be set via 'defaults' (second arg in updateProperties)
    // ... rather than directly on private field declarration (e.g., '#open = false'):
    this.updateProperties(properties, { dismissible: false, open: false });
  }

  static get observedAttributes() {
    return ['dismissible', 'open'];
  }

  /* Returns flag that controls if modal is dissmissible (top close button shown and click outside modal closes modal with value = null). */
  get dismissible() {
    return this.#dismissible;
  }

  /* Sets flag that controls if modal is dissmissible (top close button shown and click outside modal closes modal with value = null). */
  set dismissible(arg) {
    if (arg === true) {
      this.root.querySelector('x-background').addEventListener('click', this.#onBackgroundClickBound);
    }
    else if (arg === false) {
      this.root.querySelector('x-background').removeEventListener('click', this.#onBackgroundClickBound);
    }
    this.#dismissible = arg;
    this.setNoValueAttribute('dismissible', arg);
  }

  /* Returns flag that controls if modal should open. */
  get open() {
    return this.#open;
  }

  /* Set flag that controls if modal should open. */
  set open(arg) {
    this.#open = arg;
    if (arg === true) {
      this.show();
    }
    else {
      this.style.display = 'none';
    }
    this.setNoValueAttribute('open', arg);
  }

  /* Returns width of modal. */
  get width() {
    return this.getCssVar('width');
  }

   /* Sets width of modal. */
  set width(arg) {
    this.setCssVar('width', arg);
    this.setAttribute('width', arg);
  }

  /* Shows modal. */
  // Overloads method inherited from 'Base'.
  show() {
    this.style.display = 'initial';
    !this.parentElement && document.body.append(this);
    document.body.append(this);
  }

  /* Removes modal. */
  // Overloads method inherited from 'Base'.
  hide() {
    this.remove();
  }

  /* Event handler for wrapper click. */
  // called via 'this.#onBackgroundClickBound()' and added\removed via the 'dismissible' property. */
  #onBackgroundClick(event) {
    if (event.target === event.currentTarget) {
      this.remove();
    }
  }

}

define(Modal);

export { Modal };


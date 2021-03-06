import { Base } from './base.js';
import { mixin } from './utils/mixin.js';
import { Slots } from './mixins/slots.js';
import { define } from './utils/define.js';

/* . */
class ModalContent extends mixin(Base, Slots) {
  #buttons;
  #dismissible;
  #headline;
  #text;
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <style>
      x-wrapper {
        min-height: 120px;
        display: flex;
        flex-direction: column;
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
        margin: 16px 16px;
      }

      header button {
        margin-left: auto;
        background-color: transparent;
        border: none;
        padding: 8px;
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

      main p {
        color: black; /* */
        font-family: var(--fontFamily);
        font-size: 16px;
        font-weight: 400;
        padding: 0;
        margin: 8px 16px;
      }

      footer {
        margin: 4px 8px;
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
      <header>
        <h3 class="headline"></h3>
        <button title="Dismiss" class="control">
          <svg viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </header>
      <main>
        <p class="text"></p>
        <slot></slot>
      </main>
      <footer>
      </footer>
    </x-wrapper>
    `;
    this.updateProperties(properties);
  }

  /* Returns array of control (footer) button specifications. */
  get buttons() {
    return this.#buttons;
  }

  /* Sets control (footer) button specification array. */
  set buttons(arg) {
    this.#buttons = arg
    this.#addButtons(arg);
  }

  /* Returns flag that controls visibility of top close button. */
  get dismissible() {
    return this.#dismissible;
  }

  /* Sets flag that controls visibility of top close button. */
  set dismissible(arg) {
    if (arg === true) {
      this.root.querySelector('header button').style.display = 'initial';
    }
    else {
      this.root.querySelector('header button').style.display = 'none';
    }
    this.#dismissible = arg;
   
  }

  /* Returns headline. */
  get headline() {
    return this.#headline;
  }

  /* Sets headline. */
  set headline(arg) {
    this.#headline = arg;
    this.root.querySelector('.headline').textContent = arg || '';
  }

  /* Returns text. */
  get text() {
    return this.#text;
  }

  /* Sets text. */
  set text(arg) {
    this.#text = arg;
    this.root.querySelector('.text').textContent = arg || '';
  }

  /* Adds control button (to footer). */
  #addButton(text, value, title) {
    const eButton = document.createElement('button');
    eButton.textContent = text;
    // Use 'eButton._value' since 'eButton.value' would convert to string:
    eButton._value = value;
    eButton.classList.add('control');
    title && eButton.setAttribute('title', title);
    this.root.querySelector('footer').append(eButton);
  }

  /* Adds multiple control buttons (to footer). */
  #addButtons(buttons) {
    // Remove any previously added buttons (also removes their event handlers):
    this.root.querySelectorAll('footer button').forEach(element => element.remove());
    // Add buttons:
    buttons.forEach(item => {
      const [text, value, title] = item;
      this.#addButton(text, value, title);
    });
  }

}

define(ModalContent);

export { ModalContent };

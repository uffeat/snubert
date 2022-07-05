import { Base } from './base.js';
import { MixinClick } from './mixin-click.js';
import { MixinStyles } from './mixin-styles.js';
import { utilDefine } from './util-define.js';
import { focus } from '../utils/focus.js';
import { mixin } from './util-mixin.js';

/* Button component with optional ripple effect and style classes. */
class Button extends mixin(Base, MixinClick, MixinStyles) {
  #eButton;
  #focusScope;
  #ripple;
  #value;
  // Bind event handlers (allows removal):
  #addRippleBound = this.#addRipple.bind(this);
  #setFocusBound = this.#setFocus.bind(this);
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <style>
      button {
        min-width: 64px;
        overflow: hidden;
        background-color: transparent;
        color: var(--textColor);
        font-family: var(--fontFamily);
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 8px 12px;
        border: none;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        transition: background-color 400ms;
      }

      button:hover {
        background-color: var(--backgroundColorAlt);
      }

      span.ripple {
        position: absolute;
        background-color: var(--gray300);
        /* Make ripples circular: */
        border-radius: 50%;
        /* Ensure that each ripple emerges from nothing: */
        transform: scale(0);
        animation: ripple 600ms linear;
        /* top, left, width, and height are set from code. */
      }

      @keyframes ripple {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      :host([ripple]) button {
        position: relative;
      }

      :host(.primary) button {
        background-color: var(--primaryColor400);
        color: var(--textColorOnPrimary);
        box-shadow: var(--boxShadow1);
      }

      :host(.primary) button:hover {
        background-color: var(--primaryColor500);
      }

      :host(.primary) span.ripple {
        background-color: var(--primaryColor300);
      }

      :host(.secondary) button {
        background-color: var(--secondaryColor400);
        color: var(--textColorOnSecondary);
        box-shadow: var(--boxShadow1);
      }

      :host(.secondary) button:hover {
        background-color: var(--secondaryColor500);
      }

      :host(.secondary) span.ripple {
        background-color: var(--secondaryColor300);
      }
    </style>

    <button>
      <slot></slot>
    </button>
    `;
    this.#eButton = this.root.querySelector('button');

    this.updateProperties(properties);
  }

  /* Defines attributes to sync with properties. */
  static get observedAttributes() {
    return ['focus-scope', 'ripple', 'value', 'class'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback && super.attributeChangedCallback(attr, oldValue, newValue);
    if (attr === 'class') {
      this.filterMutuallyExclusiveCssClasses(['primary', 'secondary']);
    }
  }

  get focusScope() {
    return this.#focusScope;
  }

  set focusScope(arg) {
    if (arg !== undefined) {
      this.addEventListener('click', this.#setFocusBound);
    }
    else {
      this.removeEventListener('click', this.#setFocusBound);
    }
    this.#focusScope = arg
    this.propertyChangeCallback('focusScope', arg);
  }

  /* Returns ripple flag. */
  get ripple() {
    return this.#ripple;
  }

  /* Sets ripple flag. */
  set ripple(arg) {
    if (arg === true) {
      this.addEventListener('click', this.#addRippleBound);
    }
    else {
      this.removeEventListener('click', this.#addRippleBound);
    }
    this.#ripple = arg
    this.propertyChangeCallback('ripple', arg);
  }

  /* Returns text. */
  get text() {
    return this.textContent;
  }

  /* Sets text. */
  set text(value) {
    this.textContent = value;
  }

  /* Returns text. */
  get value() {
    return this.#value;
  }

  /* . */
  set value(arg) {
    this.#value = this.interpretAttributeValue(arg, 'toBoolean');
    this.propertyChangeCallback('value', this.#value, 'fromBoolean');
  }

  getValueOnClick(callback) {
    callback && callback(this.value);
    return new Promise(resolve => {
      this.addEventListener('click', event => {
        resolve(event.target.value);
      })
    })
  }

  #addRipple(event) {
    const eOldRipple = this.root.querySelector('span.ripple');
    if (eOldRipple) {
      eOldRipple.remove();
    }
    const eRipple = document.createElement('span');
    eRipple.classList.add("ripple");
    // Set eRipple size (ripple diameter):
    const size = Math.max(this.#eButton.clientWidth, this.#eButton.clientHeight);
    eRipple.style.width = eRipple.style.height = `${size}px`;
    // Position eRipple:
    eRipple.style.left = `${event.clientX - this.#eButton.offsetLeft - size / 2}px`;
    eRipple.style.top = `${event.clientY - this.#eButton.offsetTop - size / 2}px`;
    this.#eButton.append(eRipple);
  }

  #setFocus(event) {
    focus.set(event.target, this.getAttribute('focus-scope'));
  }

}

utilDefine(Button);

export { Button };

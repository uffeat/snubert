import { Base } from './base.js';
import { utilDefine } from './util-define.js';
import { PluginClick } from './plugin-click.js';
import { PluginStyles } from './plugin-styles.js';
import { focus } from '../utils/focus.js';

/* Button component with optional ripple effect. */
class Button extends Base {
  #eButton;
  #value;
  // Bind event handlers (allows removal):
  #addRippleBound = this.#addRipple.bind(this);
  #setFocusBound = this.#setFocus.bind(this);
  constructor(properties) {
    super();
    this._addPlugins(PluginClick, PluginStyles);
    this.html = /*html*/ `
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

  get class() {
    return this.getAttribute('class');
  }

  set class(value) {
    if (value.includes('primary') && value.includes('secondary')) {
      //const classArray = value.split(' ');
      const classArray = ['stuff', 'primary', 'secondary'];
      const lastAdded = classArray[classArray.length-1]
      const [lastClass, ...firstClasses] = classArray.reverse()
      console.log("lastClass", lastClass)
      console.log("firstClasses", firstClasses)
      console.warn(`The 'primary' and 'secondary' classes are mutually exclusive. Only '' wil be applied`);

    }
    console.log("class changed to: ", value)
    this._syncAttribute('class', value);
  }

  get focusScope() {
    return this.hasAttribute('focus-scope');
  }

  set focusScope(value = 'global') {
    if (value) {
      this.addEventListener('click', this.#setFocusBound);
    }
    else {
      this.removeEventListener('click', this.#setFocusBound);
    }
    this._syncAttribute('focusScope', value);
  }

  /* Returns ripple flag. */
  get ripple() {
    return this.hasAttribute('ripple');
  }

  /* Sets ripple flag. */
  set ripple(value) {
    if (value === true) {
      this.addEventListener('click', this.#addRippleBound);
    }
    else {
      this.removeEventListener('click', this.#addRippleBound);
    }
    this._syncAttribute('ripple', value);
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
  set value(value) {
    this.#value = _interpretAttributeValue(value, 'toBoolean', 'toNumber', 'none');
    this._syncAttribute('value', this.#value, 'fromBoolean', 'fromNumber', 'none');
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

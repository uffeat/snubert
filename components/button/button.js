import { mixin } from '../utils/mixin.js';
import { MixinAttrs } from '../mixins/attrs.js';
import { MixinProps } from '../mixins/props.js';
import { define } from '../utils/define.js';
import componentStylesheet from "./button.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, componentStylesheet];


/* Ligh DOM Button component. */
class Button extends mixin(HTMLButtonElement, MixinAttrs, MixinProps) {
  static _extends = "button";
  #ripple;
  // Bind event handlers (allows removal):
  #addRippleBound = this.#addRipple.bind(this);
  constructor(properties) {
    super();
    this.classList.add('snu');
    this.updateProperties(properties);
  }

  /* Defines attributes to sync with properties. */
  static get observedAttributes() {
    return ['ripple'];
  }

  /* Returns ripple flag. */
  get ripple() {
    return this.#ripple;
  }

  /* Sets ripple flag. */
  set ripple(arg) {
    // Validate:
    if (![true, false].includes(arg)) {
      throw new Error(`Invalid value of 'ripple': ${arg}.`)
    }
    if (arg === true) {
      this.addEventListener('click', this.#addRippleBound);
      this.style.position = 'relative';
    }
    else {
      this.removeEventListener('click', this.#addRippleBound);
      this.style.position = 'initial';

    }
    this.#ripple = arg
    this.setNoValueAttribute('ripple', arg)
  }

  /* Returns text. */
  get text() {
    return this.textContent;
  }

  /* Sets text. */
  set text(arg) {
    this.textContent = arg;
  }

  #addRipple(event) {
    const eOldRipple = this.querySelector('span.ripple');
    if (eOldRipple) {
      eOldRipple.remove();
    }
    const eRipple = document.createElement('span');
    eRipple.classList.add("ripple");
    // Set eRipple size (ripple diameter):
    const size = Math.max(this.clientWidth, this.clientHeight);
    eRipple.style.width = eRipple.style.height = `${size}px`;
    // Position eRipple:
    eRipple.style.left = `${event.clientX - this.offsetLeft - size / 2}px`;
    eRipple.style.top = `${event.clientY - this.offsetTop - size / 2}px`;
    this.append(eRipple);
  }

}

define(Button);



export { Button };
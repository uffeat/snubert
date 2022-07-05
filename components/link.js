import { Base } from './base.js';
import { MixinClick } from './mixin-click.js';
import { MixinSlots } from './mixin-slots.js';
import { MixinStates } from './mixin-states.js';
import { MixinStyles } from './mixin-styles.js';
import { utilDefine } from './util-define.js';
import { focus } from '../utils/focus.js';
import { mixin } from './util-mixin.js';

class Link extends mixin(Base, MixinClick, MixinSlots, MixinStates, MixinStyles) {
  #eLink;
  #eText;
  #focusScope;
  // Bind event handlers (allows removal):
  #setFocusBound = this.#setFocus.bind(this);
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <style>
    </style>
    <a>
      <slot></slot>
    </a>
    `;
    this.#eLink = this.root.querySelector('a');

    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['focus-scope', 'href', 'target'];
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

  get href() {
    return this.#eLink.href;
  }

  set href(arg) {
    this.#eLink.href = arg;
    this.propertyChangeCallback('href', arg);
  }

  get target() {
    return this.#eLink.target;
  }

  set target(arg) {
    this.#eLink.target = arg;
    this.propertyChangeCallback('target', arg);
  }

  /* Returns text. */
  get text() {
    return this.textContent;
  }

  /* Sets text. */
  set text(arg) {
    this.textContent = arg;
  }

  #setFocus(event) {
    focus.set(event.target, this.getAttribute('focus-scope'));
  }

}

utilDefine(Link);

export { Link };

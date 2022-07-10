import { Base } from './base.js';
import { mixin } from './utils/mixin.js';
import { define } from './utils/define.js';
import { MixinClick } from './mixins/mixin-click.js';
import { MixinFocus } from './mixins/mixin-focus.js';
import { MixinSlots } from './mixins/mixin-slots.js';
import { MixinStyles } from './mixins/mixin-styles.js';

class Link extends mixin(Base, MixinClick, MixinFocus, MixinSlots, MixinStyles) {
  #eLink;
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

  /* Defines attributes to sync with properties. */
  static get observedAttributes() {
    return ['focus-scope', 'href', 'target'];
  }

  get href() {
    return this.#eLink.href;
  }

  set href(arg) {
    this.#eLink.href = arg;
    this.setAttribute('href', arg);
  }

  get target() {
    return this.#eLink.target;
  }

  set target(arg) {
    this.#eLink.target = arg;
    this.setAttribute('target', arg);
  }

  /* Returns text. */
  get text() {
    return this.textContent;
  }

  /* Sets text. */
  set text(arg) {
    this.textContent = arg;
  }

}

define(Link);

export { Link };

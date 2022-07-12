import { mixin } from '../utils/mixin.js';
import { MixinAttrs } from '../mixins/attrs.js';
import { MixinClick } from '../mixins/click.js';
import { MixinFocus } from '../mixins/focus.js';
import { MixinProps } from '../mixins/props.js';
import { MixinShadow } from '../mixins/shadow.js';
import { MixinShadowStyles } from '../mixins/shadow-styles.js';
import { MixinSlots } from '../mixins/slots.js';
import { MixinStyles } from '../mixins/styles.js';
import { define } from '../utils/define.js';


// TODO: Clean up mixins.

class Link extends mixin(
  HTMLElement, MixinAttrs, MixinProps, MixinClick, MixinFocus, MixinShadow, MixinShadowStyles, MixinSlots, MixinStyles
) {
  static _extends = null;
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
    this.updateProperties(properties, { href: '#' });
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

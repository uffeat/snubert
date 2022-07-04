import { Base } from './base.js';
import { utilDefine } from './util-define.js';
import { PluginClick } from './plugin-click.js';
import { PluginSlots } from './plugin-slots.js';
import { PluginStates } from './plugin-states.js';
import { PluginStyles } from './plugin-styles.js';
import { focus } from '../utils/focus.js';

class Link extends Base {
  #eLink;
  #eText;
  #focusScope;
  // Bind event handlers (allows removal):
  #setFocusBound = this.#setFocus.bind(this);
  constructor(properties) {
    super();
    this.addPlugins(PluginClick, PluginStates, PluginSlots, PluginStyles);
    this.html = /*html*/ `
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

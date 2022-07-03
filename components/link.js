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
  // Bind event handlers (allows removal):
  #setFocusBound = this.#setFocus.bind(this);
  constructor(properties) {
    super();
    this._addPlugins(PluginClick, PluginStates, PluginSlots, PluginStyles);
    this.html = /*html*/ `
    <style>
    </style>
    <a>
      <span class="text"></span>
      <slot></slot>
    </a>
    `;
    this.#eLink = this.root.querySelector('a');
    this.#eText = this.root.querySelector('.text');

    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['focus-scope', 'href', 'target', 'text',];
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

  get href() {
    return this.#eLink.href;
  }

  set href(value) {
    this.#eLink.href = value;
    this._syncAttribute('href', value);
  }

  get target() {
    return this.#eLink.target;
  }

  set target(value) {
    this.#eLink.target = value;
    this._syncAttribute('target', value);
  }

  get text() {
    return this.#eText.textContent;
  }

  set text(value) {
    this.#eText.textContent = value;
    this._syncAttribute('text', value);
  }

  #setFocus(event) {
    focus.set(event.target, this.getAttribute('focus-scope'));
  }

}

utilDefine(Link);

export { Link };

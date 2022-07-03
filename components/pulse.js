import { Base } from './base.js';
import { PluginClick } from './plugin-click.js';
import { PluginSlots } from './plugin-slots.js';
import { utilDefine } from './util-define.js';

/* Component for marking. */
class Pulse extends Base {
  #eDynamic;
  #eStatic;
  constructor(properties) {
    super();
    this._addPlugins(PluginClick, PluginSlots);
    this.html = /*html*/ `
    <style>
      :host {
        --dynamicColor: var(--primaryColor100, pink);
        --size: 48px;
        --staticColor: var(--primaryColor500, red);
        --time: 800ms;
      }
            
      .wrapper {
        position: relative;
        display: inline-block;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        background-color: transparent;
      }
            
      .static,
      .dynamic {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
            
      .static {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: var(--staticColor);
        z-index: 2;   /* TODO: CSS var? */
      }
            
      .dynamic {
        display: inline-block;
        background-color: var(--dynamicColor);
        z-index: 1;  /* TODO: CSS var? */
      }
            
      :host([on]) .dynamic {
        animation: dynamic var(--time) ease-in infinite;
        z-index: 1;  /* TODO: CSS var? */
      }
            
      @keyframes dynamic {
        from {
          transform: scale(1);
          opacity: 1;
        }
            
        to {
          transform: scale(1.9);
          opacity: 0.2;
        }
      }
    </style>
    <div class="wrapper">
      <span class="static">
        <slot></slot>
      </span>
      <span class="dynamic"></span>
    </div>
    `;
    this.#eStatic = this.root.querySelector('.static');
    this.#eDynamic = this.root.querySelector('.dynamic');
    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['color', 'on', 'pulse-color', 'size', 'text', 'time'];
  }

  /* Returns color of inner circle. */
  get color() {
    return getComputedStyle(this).getPropertyValue('--staticColor'); 
  }

   /* Sets color of inner circle. */
  set color(value) {
    this.style.setProperty('--staticColor', value);
    this._syncAttribute('color', value);
  }

  /* Returns Boolean flag for starting/stopping pulse action. */
  get on() {
    return this.hasAttribute('on'); 
  }

  /* Sets Boolean flag for starting/stopping pulse action. */
  set on(value) {
    this._syncAttribute('on', value);
  }

  /* Returns color of outer dynamic circle. */
  get pulseColor() {
    return getComputedStyle(this).getPropertyValue('--dynamicColor'); 
  }

  /* Sets color of outer dynamic circle. */
  set pulseColor(value) {
    this.style.setProperty('--dynamicColor', value);
    this._syncAttribute('pulseColor', value);
  }

  /* Returns size of component (max. diameter of outer dynamic circle). */
  get size() {
    return getComputedStyle(this).getPropertyValue('--size'); 
  }

  /* Sets size of component (max. diameter of outer dynamic circle). */
  set size(value) {
    this.style.setProperty('--size', value);
    this._syncAttribute('size', value);
  }

  /* Returns text. */
  get text() {
    return this.#eStatic.textContent; 
  }

  /* Sets text. */
  set text(value) {
    this.#eStatic.textContent = value
    this._syncAttribute('text', value);
  }

  /* Returns pulse cycle time. */
  get time() {
    return getComputedStyle(this).getPropertyValue('--time'); 
  }

  /* Sets pulse cycle time. */
  set time(value) {
    this.style.setProperty('--time', value);
    this._syncAttribute('time', value);
  }

  /* Starts pulse action. */
  start() {
    this.on = true;
  }

  /* Stops pulse action. */
  stop() {
    this.on = false;
  }

}

utilDefine(Pulse);

export { Pulse };

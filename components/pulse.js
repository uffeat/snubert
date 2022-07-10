import { Base, define, mixin } from './base.js';
import { MixinClick } from './mixins/mixin-click.js';
import { MixinSlots } from './mixins/mixin-slots.js';
import { MixinStyles } from './mixins/mixin-styles.js';

/* Component for marking. */
class Pulse extends mixin(Base, MixinClick, MixinSlots, MixinStyles) {
  #on;
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <style>
      :host {
        --dynamicColor: var(--primaryColor100, pink);
        --size: 48px;
        --staticColor: var(--primaryColor500, red);
        --textColor: red;
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
        color: var(--textColor);
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

    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['color', 'on', 'pulse-color', 'size', 'text-color', 'time'];
  }

  /* Returns color of inner circle. */
  get color() {
    // CSS var serves as private property.
    return this.getCssVar('staticColor');
  }

  /* Sets color of inner circle. */
  set color(arg) {
    // CSS var serves as private property.
    this.setCssVar('staticColor', arg);
    this.setAttribute('color', arg);
  }

  /* Returns Boolean flag for starting/stopping pulse action. */
  get on() {
    return this.#on;
  }

  /* Sets Boolean flag for starting/stopping pulse action. */
  set on(arg) {
    this.#on = arg;
    this.setNoValueAttribute('on', arg);
  }

  /* Returns color of outer dynamic circle. */
  get pulseColor() {
    // CSS var serves as private property.
    return this.getCssVar('dynamicColor');
  }

  /* Sets color of outer dynamic circle. */
  set pulseColor(arg) {
    // CSS var serves as private property.
    this.setCssVar('dynamicColor', arg);
    this.setAttribute('pulseColor', arg);
  }

  /* Returns size of component (max. diameter of outer dynamic circle). */
  get size() {
    // CSS var serves as private property.
    return this.getCssVar('size');
  }

  /* Sets size of component (max. diameter of outer dynamic circle). */
  set size(arg) {
    // CSS var serves as private property.
    this.setCssVar('size', arg);
    this.setAttribute('size', arg);
  }

  /* Returns text. */
  get text() {
    return this.textContent;
  }

  /* Sets text. */
  set text(arg) {
    this.textContent = arg
  }

  /* Returns text color. */
  get textColor() {
    // CSS var serves as private property.
    return this.getCssVar('textColor');
  }

  /* Sets text color. */
  set textColor(arg) {
    // CSS var serves as private property.
    this.setCssVar('textColor', arg);
    this.setAttribute('textColor', arg);
  }

  /* Returns pulse cycle time. */
  get time() {
    // CSS var serves as private property.
    return this.getCssVar('time');
  }

  /* Sets pulse cycle time. */
  set time(arg) {
    // CSS var serves as private property.
    this.setCssVar('time', arg);
    this.setAttribute('time', arg);
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

define(Pulse);

export { Pulse };

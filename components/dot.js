import { Base, define } from './meta/base.js';


export const ComponentFactory = (tagName) => {
  let component = {}
  /* Component for simple filled circle. */
  component = class extends Base {
    #properties = {}
    constructor() {
      super()
      this.html = /*html*/ `
      <style>
        .dot {
          display: inline-block;
          width: 48px;
          height: 48px;
          background-color: red;
          border-radius: 50%;
        }
  
        :host(.primary) .dot {
          background-color: var(--primaryColor400);
          background-color: var(--primaryColor400);
        }
      </style>
      <span class="dot"></span>
      <slot></slot>
      `
    }
  
  }
  
  define(tagName, component)

  return component

}

 


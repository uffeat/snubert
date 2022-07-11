import { Base } from './base.js';
import { mixin } from './utils/mixin.js';
import { Slots } from './mixins/slots.js';
import { Styles } from './mixins/styles.js';
import { define } from './utils/define.js';

/* . */
class Shadow extends mixin(Base, Slots, Styles) {
 #stylesheet;  //
  constructor() {
    super();
    // Transfer added nodes in light DOM to shadow DOM:
    this.addAddedNodesCallback(element => {
      this.#transfer(element);
    });
  }

  #transfer() {
    while (this.firstChild) {
      this.root.append(this.firstChild);
    }
  }

}

define(Shadow);

export { Shadow };

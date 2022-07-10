import { Base } from './base.js';
import { mixin } from './utils/mixin.js';
import { MixinSlots } from './mixins/mixin-slots.js';
import { MixinStyles } from './mixins/mixin-styles.js';
import { define } from './utils/define.js';

/* . */
class Shadow extends mixin(Base, MixinSlots, MixinStyles) {
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

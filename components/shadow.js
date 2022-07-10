import { Base, define, mixin } from './base.js';
import { MixinSlots } from './mixins/mixin-slots.js';
import { MixinStyles } from './mixins/mixin-styles.js';

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

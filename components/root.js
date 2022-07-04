import { Base } from './base.js';
import { utilDefine } from './util-define.js';
import { PluginSlots } from './plugin-slots.js';


class Root extends Base {
  constructor(properties) {
    super();
    this.addPlugins(PluginSlots);
    this.html = /*html*/ `
    <style>
    </style>
    <slot></slot>
    `;
  }
 
  mount() {
    document.body.append(this);
  }

}

utilDefine(Root);

export { Root };

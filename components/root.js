import { Base } from './base.js';
import { utilDefine } from './util-define.js';


class Root extends Base {
  constructor(properties) {
    super();
    this.rootHtml = /*html*/ `
    <slot></slot>
    `;
  }

}

utilDefine(Root);

export { Root };

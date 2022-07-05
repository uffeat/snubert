import { Base } from './meta/base.js';
import { define } from './meta/define.js';


export class Container extends Base {
  constructor(kwargs = {}) {
    const { cssText, html } = kwargs
    super()
    this.rootHtml = html
    this.addStyles(cssText)
  }

}

define(Container)

import { Base } from './meta/base.js'
import { define } from './meta/define.js'
import { focus } from '../utils/focus.js'


export class Component extends Base {
  constructor(kwargs = {}) {
    super()
    const { clickHandler, cssText, focusScope, html, sheet } = kwargs
    clickHandler && this.addEventListener('click', clickHandler)
    this.addStyles(cssText)
    this.addStylesheet(sheet)
    focusScope && this.addEventListener('click', event => focus.set(event.target, focusScope))
    this.html = html
  }

}

define(Component)



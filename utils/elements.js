import { focus } from './focus.js'

/* Constructor function for element. */
function createElement(tagName, { attributes = {}, clickHandler, cssClasses = [], focusScope, html, htmlPosition = 'beforeend', id,
  slot, styles = {}, tag, text, textPosition = 'afterbegin' }) {
  // "Hard object property":
  let orginalDisplay
  // Helper function:
  const captureOriginalDisplay = () => {
    const currentDisplay = getComputedStyle(element).getPropertyValue('display')
    if (!orginalDisplay && currentDisplay !== 'none') {
      orginalDisplay = currentDisplay
    }
  }
  // Create element:
  const element = document.createElement(tagName)
  // Set element features:
  if (Object.keys(attributes).length > 0) {
    for (const [attr, value] of Object.entries(attributes)) {
      element.setAttribute(attr, value)
    }
  }
  clickHandler && element.addEventListener('click', clickHandler)
  cssClasses.forEach(cssClass => element.classList.add(cssClass))
  focusScope && element.addEventListener('click', event => focus.set(event.target, focusScope))
  html && element.insertAdjacentHTML(htmlPosition, html)
  if (id) {
    element.id = id
  }
  if (slot) {
    element.slot = slot
  }
  if (Object.keys(styles).length > 0) {
    for (const [prop, value] of Object.entries(styles)) {
      element.style[prop] = value
    }
  }
  // Generic monkey-patching:
  if (tag) {
    element.tag = tag
  }
  text && element.insertAdjacentHTML(textPosition, text)
  element.hide = () => {
    captureOriginalDisplay()
    element.style.display = 'none'
  }
  element.show = () => {
    captureOriginalDisplay()
    element.style.display = orginalDisplay
  }

  return element
}

export { createElement };

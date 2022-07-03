import { focus } from './focus.js'

/* "Factory function" for element. Essentially, an enhanced version of 'document.createElement().' */
function createElement(tagName, { attributes = {}, clickHandler, cssClasses = [], focusScope, html, htmlPosition = 'beforeend', id,
  slot, styles = {}, tag, text, textPosition = 'afterbegin' }) {
  // "Hard object property":
  let orginalDisplay

  

  // Create element:
  const element = document.createElement(tagName)

  // Set element attributes:
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

  /* Helper function for capturing the initial display value of element.
  Used for added 'hide()' and 'show()' functions. */
  const captureOriginalDisplay = () => {
    const currentDisplay = getComputedStyle(element).getPropertyValue('display')
    if (!orginalDisplay && currentDisplay !== 'none') {
      orginalDisplay = currentDisplay
    }
  }

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

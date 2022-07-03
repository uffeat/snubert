/* . */
class PluginStyles {

  /* Adds styles to component (with constructable stylesheet). */
  addStyles(cssText, target = this.root) {
    // NB: Adopted stylesheets are removed from component when component is removed from the DOM.
    if (cssText) {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(cssText)
      if (!target.adoptedStyleSheets.includes(sheet)) {
        target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet]
      }
    }
  }

  /* Adds stylesheet to component. */
  addStylesheet(sheet, target = this.root) {
    // NB: Adopted stylesheets are removed from component when component is removed from the DOM.
    if (sheet && !target.adoptedStyleSheets.includes(sheet)) {
      target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet]
    }
  }

}

export { PluginStyles };

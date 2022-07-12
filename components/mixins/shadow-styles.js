/* Mixin that enables style-related features. */
const MixinShadowStyles = Parent => {
  class ShadowStyles extends Parent {
    static requiredMixins = ['Shadow'];  // Applied in mixin function (mixin.js).
    constructor() {
      super();
    }

    /* Adds styles to component (with constructable stylesheet). */
    addStyles(cssText, target = this.root) {
      // NB: Adopted stylesheets are removed from component when component is removed from the DOM.
      if (cssText) {
        const sheet = new CSSStyleSheet()
        sheet.replaceSync(cssText);
        if (!target.adoptedStyleSheets.includes(sheet)) {
          target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
        }
      }
    }

    /* Adds stylesheet to component. */
    addStylesheet(sheet, target = this.root) {
      // NB: Adopted stylesheets are removed from component when component is removed from the DOM.
      if (sheet && !target.adoptedStyleSheets.includes(sheet)) {
        target.adoptedStyleSheets = [...target.adoptedStyleSheets, sheet];
      }
    }

  }
  // Named class is returned explicitly (rather than 'return class...' in the beginning of the mixin function)
  // to allow for any processing of the class before return.
  return ShadowStyles;
}

export { MixinShadowStyles };

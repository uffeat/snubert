/* Mixin that enables style-related features. */
const MixinStyles = Parent => {
  return class extends Parent {
    constructor() {
      super();
    }

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

    /* Removes CSS classes to ensure that mutually exclusive classes are not added. */
    filterMutuallyExclusiveCssClasses(mutuallyExclusiveClasses) {
      const conflictingClasses = [...this.classList].filter(c => mutuallyExclusiveClasses.includes(c))
      if (conflictingClasses.length > 1) {
        const [classToKeep, ...classesToRemove] = conflictingClasses.reverse()
        console.warn(`The classes '${conflictingClasses.join(', ')}' are mutually exclusive. Only '${classToKeep}' will be applied...`);
        classesToRemove.forEach(c => this.classList.remove(c));
      }
    }

    /* Returns CSS var of component (:host). Specify without '--'. */
    getCssVar(cssVar) {
      return getComputedStyle(this).getPropertyValue(`--${cssVar}`);
    }

    /* Sets CSS var of component (:host). Specify without '--'. */
    setCssVar(cssVar, value) {
      this.style.setProperty(`--${cssVar}`, value);
    }

    /* Set callback to be invoked whenever the component class list is changed. Callback arg: None. */
    // NB: Alternative: added 'class' to observed attributes and overload attributeChangedCallback.
    setClassChangeCallback(callback) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'class') {
            callback();
          }
          observer.disconnect();
        })
      })
      observer.observe(this, { attributes: true });
    }

  }

}

export { MixinStyles };

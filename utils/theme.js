import basics from "../data/themes/basics.json" assert { type: "json" }
import palettes from "../data/themes/palettes.json" assert { type: "json" }
// 'basics' and 'palettes' could just as well have been defined as a property of 'Theme' (more perfomant, less clear), 
//  ... but I wanted to try out the "import-assert-json" feature.

/* Manages thems settings. */
class Theme {
  /* Returns an array of palette titles. */
  get paletteTitles() {
    return Object.keys(palettes).map(palette => this.#camelToTitle(palette))
  }

  /* Sets primary and secondary themes. */
  setTheme({basic = 'light1', primary, secondary}) {
    console.info('Setting themes...')
    // If secondary is not specified, make secondary same as primary:
    secondary = secondary || primary
    // Validate args:
    if (!(basic in basics)) {
      throw new Error(`Invalid value for basic theme: '${basic}'.`)
    }
    if (!(primary in palettes)) {
      throw new Error(`Invalid value for primary theme: '${primary}'.`)
    }
    if (!(secondary in palettes) && primary !== secondary) {
      throw new Error(`Invalid value for primary theme: '${secondary}'.`)
    }

    // Set basic CSS vars:
    for (const [cssVar, value] of Object.entries(basics[basic])) {
      document.querySelector(':root').style.setProperty(`--${cssVar}`, value)
    }

    // Set '--primaryColor50', '--primaryColor100', etc. CSS vars (for :root):
    for (const [shade, color] of Object.entries(palettes[primary]['shades'])) {
      document.querySelector(':root').style.setProperty(`--primaryColor${shade}`, color)
    }
    // Set primary theme text CSS vars (for :root):
    document.querySelector(':root').style.
    setProperty(`--textColorAlt`, palettes[primary]['text']['textColorAlt']);
    document.querySelector(':root').style.
    setProperty(`--textColorOnPrimary`, palettes[primary]['text']['textColorOnPalette']);

    // Set '--secondaryColor50', '--secondaryColor100', etc. CSS vars (for :root):
    for (const [shade, color] of Object.entries(palettes[secondary]['shades'])) {
      document.querySelector(':root').style.setProperty(`--secondaryColor${shade}`, color)
    }
    // Set secondary theme text CSS vars (for :root):
    document.querySelector(':root').style.
    setProperty(`--textColorOnSecondary`, palettes[secondary]['text']['textColorOnPalette'])
  }

  #camelToTitle(word) {
    const isUpperOrNumber = c => {
      const isUpper = c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90
      const isNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c)
      return isUpper || isNumber
    }
    word = word.split('').map((c) => isUpperOrNumber(c) ? ' ' + c : c).join('')
    word = word[0].toUpperCase() + word.slice(1)
    return word
  }

}

const theme = new Theme()


export { theme };
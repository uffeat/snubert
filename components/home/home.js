import { mixin } from '../utils/mixin.js';
import { MixinAttrs } from '../mixins/attrs.js';
import { MixinProps } from '../mixins/props.js';
import { MixinShadow } from '../mixins/shadow.js';
import { MixinSlots } from '../mixins/slots.js';
import { define } from '../utils/define.js';
import componentStylesheet from "./home.css" assert { type: "css" };
document.adoptedStyleSheets = [...document.adoptedStyleSheets, componentStylesheet];

class Home extends mixin(HTMLElement, MixinAttrs, MixinProps, MixinShadow, MixinSlots) {
  static _extends = null;
  #disabled = false;  // Default can be set here, since no need for initial invokation of setter.
  constructor(properties) {
    super()
    this.rootHtml = /*html*/ `
    <style>
      :host {
        --footerHeight: 100px;
        --headerHeight: 70px;
        --sideWidth: 240px;
        --sideTransitionTime: 400ms;
      }

      header {
        position: fixed;
        width: 100%;
        top: 0;
        height: var(--headerHeight);
        display: flex;
        align-items: center;
        background-color: var(--primaryColor400);
        padding-left: 16px;
        box-shadow: var(--boxShadow1);
      }

      header a.toggle {
        display: initial;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 32px;
        background-color: transparent;
        padding: 0 8px;
        border: none;
        transition: background-color 200ms;
      }

      header a.toggle:hover {
        background-color: var(--primaryColor500);
      }

      header a.toggle>svg {
        width: 32px;
        height: 32px;
      }

      header a.toggle>svg>path {
        fill: var(--textColorOnPrimary);
        stroke: transparent;
      }

      :host([disabled]) a.toggle {
        display: none;
      }

      header a.home {
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0 8px;
        transition: background-color 200ms;
      }

      header a.home .logo {
        height: 60%;
        margin: 0 4px 0 0;
      }

      header a.home .headline {
        display: none;
        font-family: var(--fontFamily);
        font-size: 24px;
        font-weight: 600;
        color: var(--textColorOnPrimary);
        padding: 0;
        margin: 0 0 0 4px;
      }

      header nav.top {
        height: 100%;
        margin-left: auto;
        padding-right: 24px;
        display: flex;
        justify-content: flex-end;
      }

      x-page {
        display: flex;
        flex-direction: column;
        /* Make room for header: */
        margin-top: var(--headerHeight);
        /* Specify height to enable scrolling: */
        height: calc(100vh - var(--headerHeight));
        overflow-y: auto;
      }

      x-page main {
        /* Stretch down to footer: */
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      x-page footer {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: var(--secondaryColor400);
        color: white;
        /* Do not sepcify height (messes up scrolling). */
        min-height: var(--footerHeight);
      }

      x-side {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: var(--sideWidth);
        z-index: var(--zIndex20, 20);
        display: flex;
        flex-direction: column;
        background-color: var(--backgroundColor);
        box-shadow: var(--boxShadow1);
        transition: transform var(--sideTransitionTime);
        overflow-y: auto;
      }

      x-side button.close {
        align-self: flex-end;
        background-color: transparent;
        padding: 8px;
        border: none;
        margin-top: 8px;
        margin-right: 16px;
      }

      x-side button.close>svg {
        width: 18px;
        height: 18px;
      }

      x-side button.close>svg>path {
        fill: var(--gray400);
        stroke: transparent;
        transition: fill 200ms;
      }

      x-side .headline {
        color: var(--primaryColor400);
        padding-left: 16px;
      }

      x-side button.close:hover>svg>path {
        fill: var(--gray700);
      }

      x-side slot[name="side"] {
        display: flex;
        flex-direction: column;
      }

      :host([closed]) x-side {
        transform: translateX(-100%);
      }

      @media (min-width: 600px) {
        header a.home .headline {
          display: initial;
        }

        x-side {
          top: var(--headerHeight);
          /* Small top margin -> smoother interface against header: */
          margin-top: 1px;
          height: calc(100vh - var(--headerHeight));
        }

        x-side button.close {
          margin-right: 0;
        }

        x-side .headline {
          display: none;
        }

        main slot[name="main"] {
          margin-left: var(--sideWidth);
          transition: margin-left var(--sideTransitionTime);
        }

        :host([closed]) slot[name="main"] {
          margin-left: 0;
        }
      }
    </style>
    <header>
      <a class="toggle" title="Toggle side panel">
        <svg viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </a>
      <a href="#" class="home">
        <img src="" alt="" class="logo">
        <h2 class="headline">headline</h2>
      </a>
      <nav class="top">
        <slot name="top"></slot>
      </nav>
    </header>
    <x-page>
      <main>
        <slot name="main"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </x-page>
    <x-side>
      <button class="close" title="Close side panel">
        <svg viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
      <h2 class="headline">headline</h2>
      <slot name="side"></slot>
    </x-side>
    `;

    this.root.querySelectorAll('.close').forEach(element => {
      element.addEventListener('click', event => {
        this.close();
      })
    })

    this.root.querySelectorAll('.toggle').forEach(element => {
      element.addEventListener('click', event => {
        this.toggle();
      })
    })

    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['closed', 'disabled', 'headline', 'logo'];
  }

  get closed() {
    // No need for private property since setter does not perform any actions (other than setting attribute).
    return this.hasAttribute('closed');
  }

  set closed(arg) {
    // No need for private property since setter does not perform any actions (other than setting attribute).
    this.setNoValueAttribute('closed', arg);
  }

  get disabled() {
    return this.#disabled;
  }

  set disabled(arg) {
    this.#disabled = arg;
    if (arg === true) {
      this.close();
    }
    this.setNoValueAttribute('disabled', arg);
  }

  get headline() {
    return this.root.querySelector('.headline').textContent;
  }

  set headline(arg) {
    this.root.querySelectorAll('.headline').forEach(element => element.textContent = arg);
    this.setAttribute('headline', arg);
  }

  get logo() {
    return this.root.querySelector('.logo').src;
  }

  set logo(arg) {
    this.root.querySelector('.logo').src = arg;
    this.setAttribute('logo', arg);
  }

  close() {
    this.setAttribute('closed', '');
  }

  open() {
    this.removeAttribute('closed');
  }

  toggle() {
    this.closed = !this.closed;
  }

}

define(Home);

export { Home };

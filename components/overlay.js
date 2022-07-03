import Component from './base/component.js';

/* . */
export class Overlay extends Component {
  #content
  #eWrapper
  #state
  #states
  constructor(properties) {
    super({})
    this.rootHtml = /*html*/ `
    <style>
      x-wrapper {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 80; /* */
        background-color: white; /* */
        padding: 24px 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
      }

      header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      header .title {
        width: 100%;
        color: black; /* */
        font-family: var(--fontFamily);
        font-size: 32px;
        font-weight: 500;
        padding: 0 0 16px 0;
        margin: 0;
        text-align: center;
      }

      header button {
        display: none;
        margin-left: auto;
        background-color: transparent;
        border: none;
      }

      :host([dismissible]) header button {
        display: initial;
      }

      header button>svg {
        width: 18px;
        height: 18px;
      }

      header button>svg>path {
        fill: var(--gray600);
        stroke: transparent;
        transition: fill 200ms;
      }

      header button:hover>svg>path {
        fill: black;
      }

      main {
        align-self: center;
        width: fit-content;
        min-width: 200px;
        max-width: max(90%, 600px);
        flex-grow: 1;
        padding-top: 16px;
      }

      footer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        column-gap: 24px;
      }

      footer button {
        position: relative;
        min-width: 64px;
        overflow: hidden;
        background-color: var(--primaryColor400);
        color: white;
        font-family: var(--fontFamily);
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 8px 12px;
        border: none;
        border-radius: 2px;
        box-shadow: var(--boxShadow1);
        outline: none;
        cursor: pointer;
        transition: background-color 400ms;
      }

      footer button:hover {
        background-color: var(--primaryColor600);
      }
    </style>
    <x-wrapper>
      <header>
        <button>
          <svg viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
        <h3 class="title"></h3>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <button>Ok</button>
      </footer>
    </x-wrapper>
    `
    this.#eWrapper = this.root.querySelector('x-wrapper')

    // Shadow generic click handler to enable event listener removal:
    this._onClickBound = this._onClick.bind(this)
    
    this.root.querySelectorAll('footer button').
    forEach(element => element.addEventListener('click', this._onClickBound))

    this.updateProperties(properties, {dismissible: true})
  }

  get content() {
    return this.#content
  }

  set content(value) {
    while (this.firstChild) {
      this.firstChild.remove()
    }
    this.append(value)
    this.#content = value
  }

  get dismissible() {
    return this.hasAttribute('dismissible')
  }

  set dismissible(value) {
    if (value === true) {
      this.setAttribute('dismissible', '')
      this.root.querySelector('header button').addEventListener('click', this._onClickBound)
    }
    else {
      this.removeAttribute('dismissible')
      this.root.querySelector('header button').removeEventListener('click', this._onClickBound)
    }
  }

  get state() {
    return this.#state
  }

  set state(_) {
    throw new Error(`'state' is read-only.`)
  }

  get states() {
    return this.#states
  }

  set states(value) {
    this.#states = value
    if (value) {
      const eFooter = this.root.querySelector('footer')
      while (eFooter.firstChild) {
        eFooter.firstChild.remove()
      }
      for (const [state, details] of Object.entries(value)) {
        const eButton = document.createElement('BUTTON')
        eButton.textContent = details.text
        eButton.callback = details.callback
        eButton.addEventListener('click', this._onClickBound)
        eFooter.insertAdjacentElement('beforeend', eButton)
      }
    }
  }

  get title() {
    return this.getAttribute('title')
  }

  set title(value) {
    this.root.querySelector('.title').textContent = value || ''
  }

  close() {
    this.remove()
  }

  _onClick(event) {
    event.stopPropagation()
    // Only react to wrapper click if not click on wrapper children:
    if (event.currentTarget === this.#eWrapper && event.target !== this.#eWrapper) {
      return
    }
    this.#state = event.currentTarget.state
    event.currentTarget.callback && event.currentTarget.callback()
    this.close()
  }

}

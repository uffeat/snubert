import { Base } from './base.js';
import { utilDefine } from './util-define.js';

/* . */
class InputText extends Base {
  constructor(properties) {
    super();
    this.html = /*html*/ `
    <style>
      :host {
        --fontSize: 16px;
        min-width: 280px;
      }
      
      label {
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        background-color: white;
      }
      
      input {
        width: 100%;
        font-family: var(--fontFamily);
        color: var(--gray800);
        border-style: solid;
        border-width: 2px;
        border-radius: 6px;
        border-color: var(--gray700);
        caret-color: var(--primaryColor400);
      }
            
      input:focus {
        border-color: var(--primaryColor400);
        outline: none;
      }
            
      :host([invalid]) input {
        border-color: red;
        color: red;
      }
            
      /* Prompt */
            
      .prompt {
        position: absolute;
        font-family: var(--fontFamily);
        transition: top 200ms;
      }
            
      :host([required]) input:placeholder-shown ~ .prompt::after {
        content: "*";
      }
      
      /* Prompt as placeholder */
      input:placeholder-shown ~ .prompt {
        color: var(--gray400);
        margin-left: 4px;
      }
            
      input,
      input:placeholder-shown ~ .prompt {
        font-size: var(--fontSize);
        padding: calc(0.5*var(--fontSize)) 10px;
      }
            
      /* Prompt as superscript */
        input:not(:placeholder-shown) ~ .prompt {
        background-color: inherit;
        font-size: calc(0.8*var(--fontSize));
        color: var(--gray800);
        left: 16px;
        top: calc(-0.75*var(--fontSize) + 0.4*var(--fontSize) - 2px);
        padding: 0 6px;
      }
            
      input:not(:placeholder-shown):focus ~ .prompt {
        color: var(--primaryColor400);
      }
            
      :host([invalid]) input:not(:placeholder-shown) ~ .prompt {
        color: red;  /* TODO: CSSvar. */
      }
      
      /* Message */
            
      .msg {
        position: absolute;
        font-family: var(--fontFamily);
        font-size: calc(0.8*var(--fontSize));
        color: var(--gray700);
        left: 12px;
        bottom: calc(-1.5*var(--fontSize) + 0.4*var(--fontSize));
      }
         
      :host([required]) input:placeholder-shown ~ .msg::before {
        content: "*Required";
      }
            
      :host([invalid]) .msg {
        color: red;
      }
    </style>
            
    <label>
      <input type="text" placeholder=" ">
      <span class="prompt">Prompt</span>
      <span class="msg"></span>
    </label>
    `;
    this.updateProperties(properties);
  }

  static get observedAttributes() {
    return ['message', 'prompt', 'required',];
  }

  get message() {
    return this.root.querySelector('.msg').textContent;
  }

  set message(value) {
    this.root.querySelector('.msg').textContent = value;
    this._syncAttribute('message', value);
  }

  get prompt() {
    return this.root.querySelector('.prompt').textContent;
  }

  set prompt(value) {
    this.root.querySelector('.prompt').textContent = value;
    this._syncAttribute('prompt', value);
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    this._syncAttribute('required', value);
  }

}

utilDefine(InputText);

export { InputText };
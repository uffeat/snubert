/* */
const getLabel2 = () => {
  const element = document.createElement('div');
  

  const html = /*html*/ `
  <style>     
      label {
        --fontSize: 16px;
        width: 280px;
        margin: 16px;
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
            
      input[invalid] {
        border-color: red;
        color: red;
      }
            
      /* Prompt */
            
      .prompt {
        position: absolute;
        font-family: var(--fontFamily);
        transition: top 200ms;
      }
            
      input[required]:placeholder-shown ~ .prompt::after {
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
            
      input[invalid]:not(:placeholder-shown) ~ .prompt {
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
         
      input[required]:placeholder-shown ~ .msg::before {
        content: "*Required";
      }
            
      input[invalid] ~ .msg {
        color: red;
      }
    </style>
            
    <label>
      <input type="text" placeholder=" ">
      <span class="prompt">Prompt</span>
      <span class="msg"></span>
    </label>
  `;

  element.innerHTML = html;

  
  return element;
  
}

export { getLabel2 };

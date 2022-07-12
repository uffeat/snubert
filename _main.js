// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const home = snubert.createComponent('Home', {
  logo: './images/logo.svg', 
  headline: "Snubert",
})
snubert.root.append(home);

const topHtml = /*html*/ `
<a href="#" slot="top">
  Test
  <hr>
</a>
`;

home.insertAdjacentHTML('beforeend', topHtml);

const buttonX = snubert.createComponent('ButtonX');
buttonX.textContent = "ButtonX";
home.addElement(buttonX, { slot: 'main'});

// Works... but not in Safari
const buttonHtml = 
/*html*/ `
<button is="snu-button-x" slot="main">
  ButtonX2
</button>
`;

home.insertAdjacentHTML('beforeend', buttonHtml);








// side:


/*
const renderSide = cParent => {

  const addLine = element => {
    const eLine = snubert.createElement('span');
    eLine.classList.add('line');
    element.append(eLine)
  }

  // Sign-up link:

  const signupLink = snubert.createElement('a', { href: '#', slot: 'top', textContent: "Sign up" });
  addLine(signupLink);
  signupLink.classList.add('home-top');  // Delete. No need. See main.css.
  signupLink.addEventListener('click', event => {

    const modal = snubert.modal(
      {
        headline: "Sign up",
        content: "Sign-up stuff",
        buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
        dismissible: false,
      },
      value => {
        if (value === true) {
          snubert.states.update('user', true);
        }
      }
    );

  });

  snubert.states.addSubscriber('user', data => {
    if (data !== null) {
      signupLink.style.display = 'none';
    }
    else {
      signupLink.style.display = 'flex';
    }
  })

  cParent.append(signupLink);

  // Log-in link:
  const loginLink = snubert.createElement('a', { href: '#',  slot: 'top', textContent: "Log in" });
  addLine(loginLink);
  loginLink.classList.add('home-top');
  loginLink.addEventListener('click', event => {

    const modal = snubert.modal(
      {
        headline: "Log in",
        content: "Log-in stuff",
        buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
        dismissible: false,
      },
      value => {
        if (value === true) {
          snubert.states.update('user', true);
        }
      }
    );

  });

  snubert.states.addSubscriber('user', data => {
    if (data !== null) {
      loginLink.style.display = 'none';
    }
    else {
      loginLink.style.display = 'flex';
    }
  })

  cParent.append(loginLink);

  // Log-out link:

  const logoutLink = snubert.createElement('a', { href: '#', slot: 'top', textContent: "Log out" });

  logoutLink.addEventListener('click', event => {

    const modal = snubert.modal(
      {
        headline: "Log out",
        content: "Do you wish to log out?",
        buttons: [["Yes", true, "Log out"], ["No", false, "Do not log out"]],
        dismissible: false,
      },
      value => {
        if (value === true) {
          snubert.states.update('user', null);
        }
      }
    );

  });

  snubert.states.addSubscriber('user', data => {
    if (data !== null) {
      logoutLink.style.display = 'flex';
    }
    else {
      logoutLink.style.display = 'none';
    }
  })

  cParent.append(logoutLink);
}

renderSide(cHome)

*/



/*

// TODO: Refactor to light DOM component.

const render = parent => {

  const container = document.createElement('div');
  container.innerHTML = `
  <a class="get-data" inject="side">Get data</a>
  
  `;

  container.querySelector(`.get-data`).addEventListener('click', event => {
    snubert.getData('key=key-1', data => {
      console.log(`Data : ${JSON.stringify(data)}`);
    });
  });

  container.setAttribute('inject', 'side');


  parent.append(container);







  // Other version
  //---------------

  const cDataLink = snubert.createComponent('Link', {
    focusScope: 'global', text: "Get data", onClick: event => {
      snubert.getData('key=key-1', data => {
        console.log(`Data : ${JSON.stringify(data)}`);
      });
    }
  })
  cParent.addElement(cDataLink, { slot: 'side' });


  const componentsLink = snubert.createElement('a', {textContent: "Stuff"});
  componentsLink.setAttribute('inject', 'side');
  componentsLink.addEventListener('click', event => {

  });

  cParent.append(componentsLink);

  
  const cComponentsLink = snubert.createComponent('Link', {
    focusScope: 'global', text: "Component examples", onClick: event => {
      const cButton = snubert.createComponent('Button', {
        text: "Click Me!", ripple: true,
      });
      cButton.classList.add('primary');
      cButton.style.padding = '48px';
      cParent.addElement(cButton, { slot: 'main' });
  
      const cInputText = snubert.createComponent('InputText', {
        prompt: "First name",
        required: true,
      });
      cInputText.style.padding = '48px';
      cParent.addElement(cInputText, { slot: 'main' });
  
      const cPulse = snubert.createComponent('Pulse', {
        color: 'green',
        on: true,
        pulseColor: 'lightGreen',
        size: '100px',
        text: "1",
        textColor: 'pink',
        time: '800ms',
      });
      cPulse.style.padding = '48px';
      cParent.addElement(cPulse, { slot: 'main' });
    }
  })
  cParent.addElement(cComponentsLink, { slot: 'side' });


  const testLink = document.createElement('a');
  testLink.textContent = "Test link";
  testLink.setAttribute('inject', 'side');
  cParent.append(testLink);

  // ----------------




  }

export { render };
  */


/*
const cButton1 = snubert.createComponent('Button', {text: "My button"});
cHome.addElement(cButton1, {slot: 'main'});

cButton1.setAttribute('ripple', '');
console.log(cButton1.ripple);

cButton1.setAttribute('value', 'true');
console.log(cButton1.getAttribute('value'));
console.log(cButton1.value);

cButton1.value = false
console.log(cButton1.getAttribute('value'));
console.log(cButton1.value);
*/
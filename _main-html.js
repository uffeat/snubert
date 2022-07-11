// Initialize the snubert namespace:
import * as _ from './snubert.js';

snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const home = document.querySelector('snu-home');

// signupLink:
const signupLink = document.getElementById('signupLink');
// signupLink.focusScope = 'top';
signupLink.addEventListener('click', event => {
  snubert.modal({
    headline: "Sign-up",
    text: "Sign up?",
    buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
    dismissible: false,
  })
  .then(value => {
    if (value === true) {
      snubert.states.update('user', {firstName: "Rufus"})
    }
  });
});

// loginLink:
const loginLink = document.getElementById('loginLink');
// loginLink.focusScope = 'top';
loginLink.addEventListener('click', event => {  
  snubert.modal({
    headline: "Log-in",
    text: "Sign in?",
    buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
    dismissible: false,
  })
  .then(value => {
    if (value === true) {
      snubert.states.update('user', {firstName: "Rufus"})
    }
  });
});

// logoutLink:
const logoutLink = document.getElementById('logoutLink');
// logoutLink.focusScope = 'top';
logoutLink.addEventListener('click', event => {
  snubert.modal({
    headline: "Log-out",
    text: "Do you wish to log out?",
    buttons: [["Yes", true, "Log out"], ["No", false, "Do not log out"]],
    dismissible: true,
  })
  .then(value => {
    if (value === true) {
      snubert.states.update('user', null)
    }
  });
});

// buttonLink:
const buttonLink = document.getElementById('buttonLink');
//logoutLink.focusScope = 'global';
buttonLink.addEventListener('click', event => {
  snubert.states.update('page', `
  <snu-button ripple slot="main" style="padding: 32px" class="primary">Click me!</snu-button>
  `);
});

// pulseLink:
const pulseLink = document.getElementById('pulseLink');
//pulseLink.focusScope = 'global';
pulseLink.addEventListener('click', event => {
  snubert.states.update('page', `<snu-pulse on slot="main" style="padding: 32px">New</snu-pulse>`);
});

// States subscriptions:
snubert.states.addSubscriber('user', data => {
  if (data === null) {
    home.disabled = true;
    home.close();
    home.clearSlot('main');
    signupLink.style.display = 'flex';
    loginLink.style.display = 'flex';
    logoutLink.style.display = 'none';
  }
  else {
    home.disabled = false;
    if (window.innerWidth > 600) {
      home.open();
    }
    signupLink.style.display = 'none';
    loginLink.style.display = 'none';
    logoutLink.style.display = 'flex';
  }
});
snubert.states.addSubscriber('page', data => {
  if (data !== null) {
    home.clearSlot('main');
    home.insertAdjacentHTML('beforeend', data);
  }
});



const buttonX1 = snubert.createComponent('ButtonX');
buttonX1.textContent = "Button X";
home.addElement(buttonX1, {slot: 'main'});


const button1 = snubert.createComponent('Button', {text: "Button"});
home.addElement(button1, {slot: 'main'});
console.log(button1._mixins);
button1.onClick = () => console.log("Clicked");
//console.log(button1._propertyNames);




//const focusLink = snubert.createElement('a', {href: '#', textContent: "Focus me!"});
//document.body.append(focusLink);

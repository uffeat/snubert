// Initialize the snubert namespace:
import * as _ from './snubert.js';

snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const home = document.querySelector('snu-home');

// signupLink:
const signupLink = document.getElementById('signupLink');

signupLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');
  snubert.modal({
    headline: "Sign up", 
    buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]]
  })
  .then(value => snubert.states.update('user', value));
});



// loginLink:
const loginLink = document.getElementById('loginLink');
loginLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');
  

});

// logoutLink:
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');

});

// buttonLink:
const buttonLink = document.getElementById('buttonLink');
buttonLink.addEventListener('click', event => {
  snubert.focus.set(event.target);
  snubert.states.update('page', `
  <snu-button ripple slot="main" style="padding: 32px" class="primary">Click me!</snu-button>
  `);
});

// pulseLink:
const pulseLink = document.getElementById('pulseLink');
pulseLink.addEventListener('click', event => {
  snubert.focus.set(event.target);
  snubert.states.update('page', `<snu-pulse on slot="main" style="padding: 32px">New</snu-pulse>`);
});

// States subscriptions:
snubert.states.addSubscriber('user', data => {
  if (data === null) {
    home.disabled = true;
    home.close();
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

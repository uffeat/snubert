// Initialize the snubert namespace:
import * as _ from './snubert.js';

snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const home = document.querySelector('snu-home');


// signupLink:

const signupLink = snubert.createElement('a', { slot: 'top', textContent: "Sign up" });
signupLink.insertAdjacentHTML('beforeend', '<span class="line"></span>');
signupLink.classList.add('home-top');
signupLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');
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
home.append(signupLink);

// loginLink:

const loginLink = document.getElementById('loginLink');
loginLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');
  const modal = snubert.modal(
    {
      headline: "Log in",
      content: "Log-in stuff",
      buttons: [["OK", true, "Log in"], ["Cancel", false, "Do not log in"]],
      dismissible: false,
    },
    value => {
      if (value === true) {
        snubert.states.update('user', true);
      }
    }
  );
});

// logoutLink:

const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', event => {
  snubert.focus.set(event.target, 'top');
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

// States subscriptions:

snubert.states.addSubscriber('user', data => {
  if (data === null) {
    signupLink.style.display = 'flex';
    loginLink.style.display = 'flex';
    logoutLink.style.display = 'none';
  }
  else {
    signupLink.style.display = 'none';
    loginLink.style.display = 'none';
    logoutLink.style.display = 'flex';
  }
});



// buttonLink:

const buttonLink = document.getElementById('buttonLink');
buttonLink.addEventListener('click', event => {
  snubert.focus.set(event.target);
});



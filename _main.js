// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const cHome = snubert.createComponent('Home', {
  logo: './images/logo.svg', 
  headline: "Snubert",
})
cHome.mount(snubert.root)

console.log(cHome.constructor.mixins);

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
  signupLink.classList.add('home-top');
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
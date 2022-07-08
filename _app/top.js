const render = cParent => {

  // Sign-up link:

  const signupLink = snubert.createElement('a', { textContent: "Sign up" });

  signupLink.setAttribute('inject', 'top');

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

  const loginLink = snubert.createElement('a', { textContent: "Log in" });

  loginLink.setAttribute('inject', 'top');

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

  const logoutLink = snubert.createElement('a', { textContent: "Log out" });

  logoutLink.setAttribute('inject', 'top');

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

export { render };

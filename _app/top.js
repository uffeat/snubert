const render = cParent => {
  const cSignupLink = snubert.createComponent('Link', {
    focusScope: 'top', 
    text: "Sign up",
    states: {
      'user': data => {
        if (data === true) {
          cSignupLink.hide();
        }
        if (data === false) {
          cSignupLink.show();
        }
      }
    },
    onClick: event => {
      const modal = snubert.modal(
        {
          headline: "Sign up",
          content: "Sign-up stuff",
          buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
          dismissible: false,
        },
        value => {
          if (value === true) {
            snubert.state.update('user', true);
          }
        }
      );
    }
  });
  cParent.addElement(cSignupLink, { slot: 'top' });



  const cLoginLink = snubert.createComponent('Link', {
    focusScope: 'top', 
    text: "Log in",
    states: {
      'user': data => {
        if (data === true) {
          cLoginLink.hide();
        }
        if (data === false) {
          cLoginLink.show();
        }
      }
    },
    onClick: event => {
      const cUserNameInputText = snubert.createComponent('InputText', {
        prompt: "Email",
        required: true,
      });
      const modal = snubert.modal(
        {
          headline: "Log in",
          content: cUserNameInputText,
          buttons: [["OK", true, "Accept"], ["Cancel", false, "Dismiss"]],
          dismissible: false,
        },
        value => {
          if (value === true) {
            snubert.states.update('user', true);
          }
        }
      );
    }
  });
  cParent.addElement(cLoginLink, { slot: 'top' });


  const cLogoutLink = snubert.createComponent('Link', {
    focusScope: 'top',
    text: "Log out",
    states: {
      'user': data => {
        if (data === true) {
          cLogoutLink.show();
        }
        if (data === false) {
          cLogoutLink.hide();
        }
      }
    },
    onClick: event => {
      const modal = snubert.modal(
        {
          headline: "Log out",
          content: "Do you wish to log out?",
          buttons: [["Yes", true, "Log out"], ["No", false, "Do not log out"]],
          dismissible: false,
        },
        value => {
          if (value === true) {
            snubert.states.update('user', false);
          }
        }
      );
    }
  });
  cLogoutLink.hide();
  cParent.addElement(cLogoutLink, { slot: 'top' });

}

export { render };
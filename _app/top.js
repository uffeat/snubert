const render = cParent => {

  
  const cSignupLink = snubert.createComponent('Link', {
    focusScope: 'top', 
    text: "Sign up",
    states: {
      'user': function(data) {
        if (data === true) {
          this.hide();
        }
        if (data === false) {
          this.show();
        }
      }
    },
    onClick: event => {

      const cDummyButton = snubert.createComponent('Button', {
        text: "Dummy",
        ripple: true,
        value: null,
      });
      cDummyButton.classList.add('primary');
      console.log(cDummyButton.value)
      console.log(cDummyButton.getAttribute('value'))

      const modal = snubert.modal(
        {
         content: cDummyButton,
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
  cParent.addElement(cSignupLink, { slot: 'top' });
  

  const cLoginLink = snubert.createComponent('Link', {
    focusScope: 'top', 
    text: "Log in",
    
    states: {
      'user': function(data) {
        if (data === true) {
          this.hide();
        }
        if (data === false) {
          this.show();
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
        value => snubert.states.update('user', value)
        
      );
    }
  });
  cParent.addElement(cLoginLink, { slot: 'top' });

  const cLogoutLink = snubert.createComponent('Link', {
    focusScope: 'top',
    text: "Log out",
    states: {
      'user': function(data) {
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
const render = cParent => {
  const cDataLink = snubert.createComponent('Link', {
    focusScope: 'global', text: "Get data", onClick: event => {
      snubert.getData('key=key-1', data => {
        console.log(`Data : ${JSON.stringify(data)}`);
      });
    }
  })
  cParent.addElement(cDataLink, { slot: 'side' });
  
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
}

export { render };
// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const cDataLink = snubert.createComponent('Link', {
  focusScope: 'global', text: "Get data", onClick: event => {
    snubert.callWorker('https://cdn.jsdelivr.net/gh/uffeat/snubert@latest/workers/get-data.js', 'key=key-1', data => {
      console.log(data);
    })
  }
});

snubert.eRoot.addElement(cDataLink);


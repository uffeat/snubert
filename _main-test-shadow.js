// Initialize the snubert namespace:
import * as _ from './snubert.js';
import buttonStylesheet from './styles/button.css' assert { type: 'css' };


snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

const cShadow = document.querySelector('snu-shadow');
cShadow.addStylesheet(buttonStylesheet);

const addedButton = document.createElement('button');
addedButton.textContent = "Added Button";

cShadow.append(addedButton);

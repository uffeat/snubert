// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

snubert.source = 'https://cdn.jsdelivr.net/gh/uffeat/snubert@0.1.3/snubert.min.js';

const cHome = snubert.createComponent('Home');

//snubert.eRoot.append(cHome);
cHome.mount(snubert.eRoot);

const cButton1 = snubert.createComponent('Button', {ripple: true, text: "Primary"});
//cButton1.textContent = "My button"

cHome.addElement(cButton1, {slot: 'main'});

cButton1.classList.add('primary');
cButton1.classList.add('secondary');
//console.log(cButton1.class)
cButton1.classList.remove('primary');


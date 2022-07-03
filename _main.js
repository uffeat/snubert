// Initialize the snubert namespace:
import * as _ from './snubert.js';


snubert.setRoot();
snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });

snubert.source = 'https://cdn.jsdelivr.net/gh/uffeat/snubert@0.1.3/snubert.min.js';

const cHome = snubert.createComponent('Home');

//cHome.mount(snubert.cRoot)  // TODO: Fix!!!

snubert.eRoot.append(cHome)

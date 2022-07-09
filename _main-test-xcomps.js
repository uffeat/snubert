// Initialize the snubert namespace:
import * as _ from './snubert.js';
//import { getFormHtml } from './xcomps/xform.js';
import { getLabel } from './xcomps/label.js';
import { getLabel2 } from './xcomps/label-2.js';


document.getElementById('root').append(getLabel())
document.getElementById('root').append(getLabel2())


snubert.theme.setTheme({ basic: 'light1', primary: 'brown', secondary: 'deepOrange' });





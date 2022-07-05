import { render as renderSide } from './side.js';
import { render as renderTop } from './top.js';


// Build UI:
const cHome = snubert.createComponent('Home', {
  logo: './images/logo.svg', 
  headline: "Snubert",
  states: {
    'user': function(data) {
      if (data === true) {
        this.open();
      }
      else {
        this.close();
      }
    }
  }
})
cHome.mount(snubert.eRoot)

// ... side:
renderSide(cHome)

// ... top:
renderTop(cHome)



/*
const cButton1 = snubert.createComponent('Button', {text: "My button"});
cHome.addElement(cButton1, {slot: 'main'});

cButton1.setAttribute('ripple', '');
//console.log(cButton1.ripple);

cButton1.setAttribute('value', '88');
console.log(cButton1.getAttribute('value'));
console.log(cButton1.value);

cButton1.value = 42
console.log(cButton1.getAttribute('value'));
console.log(cButton1.value);
*/





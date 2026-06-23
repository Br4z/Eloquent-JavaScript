import { JSDOM } from 'jsdom';

let HTML = `
<p style="border: 3px solid red">
  I'm boxed in
</p>
`;
let dom = new JSDOM(HTML);
let document = dom.window.document;

const paragraph = document.body.getElementsByTagName('p')[0];
// console.log("clientHeight:", paragraph.clientHeight)
// console.log("offsetHeight:", paragraph.offsetHeight)
// console.log("clientWidth:", paragraph.clientWidth)
// console.log("offsetWidth:", paragraph.offsetWidth)

/* -------------------------------------------------------------------------- */

HTML = `
<p><span id="one"></span></p>
<p><span id="two"></span></p>
`;
dom = new JSDOM(HTML);
document = dom.window.document;

function time(name, action) {
  const start = Date.now();
  action();
  console.log(name, 'took', Date.now() - start, 'ms');
}

time('naive', () => {
  const target = document.getElementById('one');
  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode('X'));
  }
});

time('clever', function () {
  const target = document.getElementById('two');
  target.appendChild(document.createTextNode('XXXXX'));
  const width_per_character = target.offsetWidth / 5;
  const total = Math.ceil(2000 / width_per_character);
  target.firstChild.nodeValue = 'X'.repeat(total);
});

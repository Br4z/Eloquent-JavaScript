import { JSDOM } from 'jsdom';

let HTML = `
<p>The <img src="img/cat.png" alt="Cat"> in the
  <img src="img/hat.png" alt="Hat">.</p>
`;
let dom = new JSDOM(HTML);
let document = dom.window.document;

const images = document.body.getElementsByTagName('img');
for (let i = images.length - 1; i >= 0; i--) {
  let image = images[i];
  if (image.alt) {
    let text = document.createTextNode(image.alt);
    image.parentNode.replaceChild(text, image);
  }
}

const paragraph = document.body.getElementsByTagName('p')[0];
// console.log(paragraph.textContent)

/* -------------------------------------------------------------------------- */

HTML = `
<blockquote id="quote">
  No book can ever be finished. While working on it we learn
  just enough to find it immature the moment we turn away
  from it.
</blockquote>
`;

dom = new JSDOM(HTML);
document = dom.window.document;

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

const quote = document.getElementById('quote');
quote.appendChild(
  elt(
    'footer',
    '—',
    elt('strong', 'Karl Popper'),
    ', preface to the second edition of ',
    elt('em', 'The Open Society and Its Enemies'),
    ', 1950',
  ),
);
console.log(quote.innerHTML);

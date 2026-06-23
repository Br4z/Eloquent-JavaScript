import { JSDOM } from 'jsdom';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1 id="first-header">My home page</h1>
    <p class="paragraph">Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>
`;
const dom = new JSDOM(HTML);
const document = dom.window.document;

const link = document.body.getElementsByTagName('a')[0];
console.log(link.href);

const h1 = document.getElementById('first-header');
console.log(h1.textContent);

const p = document.getElementsByClassName('paragraph')[0];
console.log(p.textContent);

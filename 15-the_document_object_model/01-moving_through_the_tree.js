import { JSDOM } from 'jsdom';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>
`;
const dom = new JSDOM(HTML);
const document = dom.window.document;
const Node = dom.window.Node;

// Print all child nodes of body
console.log('\nAll child nodes of <body>:');
for (let i = 0; i < document.body.childNodes.length; i++) {
  const node = document.body.childNodes[i];
  console.log(`[${i}] Type: ${node.nodeType}, Name: ${node.nodeName}`);
  if (node.nodeType === Node.TEXT_NODE) console.log(`\tText: ${JSON.stringify(node.nodeValue)}`);
}

function talks_about(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) if (talks_about(child, string)) return true;
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) return node.nodeValue.indexOf(string) > -1;
}

console.log(talks_about(document.body, 'book'));

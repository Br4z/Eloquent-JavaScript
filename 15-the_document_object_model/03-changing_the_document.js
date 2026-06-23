import { JSDOM } from 'jsdom';

const HTML = `
<p>One</p>
<p>Two</p>
<p>Three</p>
`;
const dom = new JSDOM(HTML);
const document = dom.window.document;

const paragraphs = document.body.getElementsByTagName('p');
document.body.insertBefore(paragraphs[2], paragraphs[0]);

for (let paragraph of paragraphs) console.log(paragraph.textContent);

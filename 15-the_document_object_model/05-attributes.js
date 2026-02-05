import { JSDOM } from "jsdom"


const HTML = `
<p data-classified="secret">The launch code is 00000000.</p>
<p data-classified="unclassified">I have two feet.</p>
`
const dom = new JSDOM(HTML)
const document = dom.window.document

const paragraphs = document.body.getElementsByTagName("p")
for (let para of Array.from(paragraphs)) {
	if (para.getAttribute("data-classified") == "secret")
		para.remove()
}

console.log(document.body.innerHTML)

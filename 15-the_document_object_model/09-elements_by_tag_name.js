import { JSDOM } from "jsdom"


const HTML = `
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>
`
const dom = new JSDOM(HTML)
const document = dom.window.document
const Node = dom.window.Node

function by_tag_name(node, tag_name) {
	tag_name = tag_name.toUpperCase()
	let output = []

	if (node.nodeType == Node.ELEMENT_NODE) {
		if (node.nodeName == tag_name)
			output.push(node)

		for (let child of node.children)
			output.push(...by_tag_name(child, tag_name))
	}

	return output
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(by_tag_name(document.body, "h1").length) // 1
console.log(by_tag_name(document.body, "span").length) // 3
const p = document.querySelector("p")
console.log(by_tag_name(p, "span").length) // 2

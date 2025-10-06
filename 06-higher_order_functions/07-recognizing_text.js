import { character_script } from "./06-strings_and_character_codes.js"


export function count_by(items, group_name) {
	let counts = []

	for (let item of items) {
		let name = group_name(item)
		let known = counts.findIndex(c => c.name == name)

		if (known == -1)
			counts.push({ name, count: 1 })
		else
			counts[known].count++
	}

	return counts
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(count_by([1, 2, 3, 4, 5], n => n > 2))


function text_scripts(text) {
	let scripts = count_by(text, char => {
			let script = character_script(char.codePointAt(0))
			return script ? script.name : "none"
		}
	).filter(({ name }) => name != "none")

	let total = scripts.reduce((n, { count }) => n + count, 0) // (count, char) => count + char.count

	if (total == 0)
		return "No scripts found"

	return scripts.map(({ name, count }) => { // char
		/*
		let name = char.name
		let count = char.count
		*/
		return `${Math.round(count * 100 / total)}% ${name}`
	}).join(", ")
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(text_scripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'))

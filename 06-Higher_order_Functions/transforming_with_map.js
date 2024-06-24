require("./SCRIPTS.js")


function map(array, transform) {
	let mapped = []

	for (let element of array)
		mapped.push(transform(element))

	return mapped
}

/* ---------------------------------- TEST ---------------------------------- */

let rtl_scripts = SCRIPTS.filter(s => s.direction == "rtl")
console.log(map(rtl_scripts, s => s.name))

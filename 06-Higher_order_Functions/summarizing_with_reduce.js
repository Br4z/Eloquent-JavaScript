const { SCRIPTS } = require("./SCRIPTS.js")


function reduce(array, combine, start) {
	let current = start

	for (let element of array)
		current = combine(current, element)

	return current
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0))


function character_count(script) {
	return script.ranges.reduce((count, [from, to]) => {
		return count + (to - from)
	}, 0)
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(
// 	SCRIPTS.reduce((a, b) => {
// 			return character_count(a) < character_count(b) ? b : a
// 		}
// 	)
// )


module.exports = { character_count }

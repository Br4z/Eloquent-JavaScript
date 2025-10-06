import { SCRIPTS } from "./01-SCRIPTS.js"
import { character_count } from "./04-summarizing_with_reduce.js"

/*
// A way without higher-order functions
let biggest = null

for (let script of SCRIPTS)
	if (biggest == null || character_count(biggest) < character_count(script))
		biggest = script

console.log(biggest)
*/

function average(array) {
	return array.reduce((a, b) => a + b) / array.length
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(
	Math.round(
		average(SCRIPTS.filter(s => s.living).map(s => s.year))
	)
)

console.log(
	Math.round(
		average(SCRIPTS.filter(s => !s.living).map(s => s.year))
	)
)

/*
// Another way
let total = 0, count = 0

for (let script of SCRIPTS)
	if (script.living) {
		total += script.year
		count += 1
	}

console.log(Math.round(total / count))
*/

// So the dead scripts in Unicode are, on average, older than the living ones.

require("./SCRIPTS.js")


// To find the scripts in the data set that are still in use.

function filter(array, test) {
	let passed = []

	for (let element of array) {
		if (test(element))
			passed.push(element)
	}

	return passed
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(filter(SCRIPTS, (script) => script.living))

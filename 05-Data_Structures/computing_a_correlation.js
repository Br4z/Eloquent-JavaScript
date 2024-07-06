const { JOURNAL } = require("./JOURNAL.js")


function phi(table) { // [n_00, n_01, n_10, n_11]
	return (table[3] * table[0] - table[2] * table[1]) /
		Math.sqrt((table[2] + table[3]) *
			(table[0] + table[1]) *
			(table[1] + table[3]) *
			(table[0] + table[2]))
}

/*
// More visual way
function phi([n00, n01, n10, n11]) {
	return (n11 * n00 - n10 * n01) /
		Math.sqrt((n10 + n11) *
				(n00 + n01) *
				(n01 + n11) *
				(n00 + n10))
}
*/

/* ---------------------------------- TEST ---------------------------------- */

// console.log(phi([76, 9, 4, 1]))


/*
	For creating the table for an event, we set the following data structure "[n_00, n_01, n_10, n_11]":

	- The first number represents the squirrel.

	- The second number represents the event.
*/
function table_for(event, journal) {
	let table = [0, 0, 0, 0]

	for (let i = 0; i < journal.length; i++) {
		let entry = journal[i], index = 0

		if (entry.events.includes(event))
			index += 1
		if (entry.squirrel)
			index += 2

		table[index] += 1
	}

	return table
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(table_for("pizza", JOURNAL))


module.exports = { phi, table_for }

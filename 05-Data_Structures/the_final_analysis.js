const { JOURNAL } = require("./JOURNAL.js")
const { phi, table_for } = require("./computing_a_correlation.js")


function journal_events(journal) {
	let events = []

	for (let entry of journal)
		for (let event of entry.events)
			if (!events.includes(event))
				events.push(event)

	return events
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(journal_events(JOURNAL))


// To see the mos relevant ones
for (let event of journal_events(JOURNAL)) {
	let correlation = phi(table_for(event, JOURNAL))

	if (correlation > 0.1 || correlation < -0.1)
		console.log(event + ":", correlation)
}


/*
	After realizing that the events "peanuts" and "teeth brushing" have the
	highest values (positive and negative correlation respectively), we can
	set a new event called "peanut teeth".
*/
for (let entry of JOURNAL)
	if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth"))
		entry.events.push("peanut teeth")


console.log(phi(table_for("peanut teeth", JOURNAL))) // The result (1) means that it is
// completely related and also the cause of his problem

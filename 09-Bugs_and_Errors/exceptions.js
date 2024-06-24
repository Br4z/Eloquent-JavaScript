function prompt_direction(question) {
	let result = "W" // prompt(question)

	if (result.toLowerCase() == "left")
		return "L"
	else if (result.toLowerCase() == "right")
		return "R"
	else
		throw new Error("Invalid direction: " + result)
}

function look() {
	if (prompt_direction("Which way?") == "L")
		return "a house"
	else
		return "two angry bears"
}

/* ---------------------------------- TEST ---------------------------------- */

try {
	console.log("You see", look())
} catch (error) {
	console.log("Something went wrong: " + error)
}
class InputError extends Error { }

function better_prompt_direction(question) {
	let result = "W" // prompt(question)

	if (result.toLowerCase() == "left")
		return "L"
	else if (result.toLowerCase() == "right")
		return "R"
	else
		throw new InputError("Invalid direction: " + result)
}

/* ---------------------------------- TEST ---------------------------------- */

for (; ;) {
	try {
		let dir = better_prompt_direction("Where?")
		console.log("You chose ", dir)
		break
	} catch (e) {
		if (e instanceof InputError)
			console.log("Not a valid direction. Try again.")
		else
			throw e
	}
}

const { character_script } = require("./strings_and_character_codes.js")
const { count_by } = require("./recognizing_text")


/*
	Write a function that computes the dominant writing direction in a string of text.
	The dominant direction is the direction of a majority of the characters that have
	a script associated with them.
*/
function dominant_direction(text) {
	let directions = count_by(text,
			char => {
				let script = character_script(char.codePointAt(0))
				return script ? script.direction : "none"
			}
		).filter(({ name }) => name != "none")

	return directions.reduce(
		(a, b) => {
			return a.count > b.count ? a : b
		}
	).name
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(dominant_direction("Hello!"))
console.log(dominant_direction("Hey, مساء الخير"))

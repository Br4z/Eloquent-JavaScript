/*
	Write a function "count_bs" that takes a string as its only argument and returns a
	number that indicates how many uppercase "B" characters there are in the string.
*/
function count_bs(string) {
	let length = string.length
	let count = 0

	for (let i = 0; i < length; i++)
		if (string[i] == "B")
			count += 1

	return count
	// count_char(string, "B")
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(count_bs("BBC"))


/*
	Write a function called "count_char" that behaves like "count_bs", except it takes a
	second argument that indicates the character that is to be counted (rather than
	counting only uppercase "B" characters).
*/
function count_char(string, char) {
	let count = 0

	for (let char_ of string)
		if (char_ == char)
			count += 1

	return count
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(count_char("kakkerlak", "k"))

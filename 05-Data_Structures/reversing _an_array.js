/*
	Write a function called "reverse_array", takes an array as an argument and produces a new array that
	has the same elements in the inverse order.
*/
function reverse_array(array) {
	let reversed_array = []

	for (let i = array.length - 1; i >= 0; i--)
		reversed_array.push(array[i])

	return reversed_array
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(reverse_array(["A", "B", "C"]))


/*
	Write a function called "reverse_array_in_place", does what the reverse method does: it modifies the
	array given as an argument by reversing its elements.
*/
function reverse_array_in_place(array) {
	const length = array.length

	for (let i = 0; i < length / 2; i++) { // Math.floor(length / 2)
		const old = array[i]

		array[i] = array[(length - 1) - i]
		array[(length - 1) - i] = old
	}

	return array
}

/* ---------------------------------- TEST ---------------------------------- */

let array = [1, 2, 3, 4, 5]
reverse_array_in_place(array)
console.log(array)

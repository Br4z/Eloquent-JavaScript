/*
	Write the function "array_to_list" that builds up a list structure like the one shown.

	value: 1      | value: 2     | value: 3
	rest: ------> | rest ------> | rest: null
*/
function array_to_list(array) {
	/*
	let list = null

	for (let i = array.length - 1; i >= 0; i--)
		list = { value: array[i], rest: list }

	return list
	*/

	if (array.length == 0)
		return null
	else
		list = { value : array.shift(), rest : array_to_list(array) }

	return list
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(array_to_list([]))


// Write the function "list_to_array" function that produces an array from a list.
function list_to_array(list, array = []) {
	/*
	let array = []

	for (let node = list; node; node = node.rest)
		array.push(node.value)

	return array
	*/

	if (list) {
		array.push(list.value)
		list_to_array(list.rest, array)
	}

	return array
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(list_to_array(array_to_list([10, 20, 30])))


/*
	Write a helper function "prepend", which takes an element and a list and
	creates a new list that adds the element to the front of the input list.
*/
function prepend(value, rest) { // value = element, rest = list
	return { value, rest }
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(prepend(5, array_to_list([10, 20, 30])))


/*
	Write the function "nth", which takes a list and a number and returns the
	element at the given position in the list (with zero referring to the
	first element) or undefined when there is no such element.
*/
function nth(list, index) {
	for (i = 0; i < index && list; i++)
		list = list.rest

	return list?.value
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(nth(array_to_list([10, 20, 30]), 1))

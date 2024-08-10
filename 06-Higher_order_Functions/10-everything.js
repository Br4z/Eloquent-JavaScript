/*
	Write a function called "everything" that takes an array and a predicate function as
	parameters. Write two versions, one using a loop and one using the "some" method.
*/
function everything_loop(array, predicate) {
	for (let element of array)
		if (!predicate(element))
			return false

	return true
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(everything_loop([1, 3, 5], n => n < 10))
console.log(everything_loop([2, 4, 16], n => n < 10))
console.log(everything_loop([], n => n < 10))


function everything_some(array, predicate) {
	return !array.some((element) => !predicate(element))
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(everything_some([1, 3, 5], n => n < 10))
console.log(everything_some([2, 4, 16], n => n < 10))
console.log(everything_some([], n => n < 10))

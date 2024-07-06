/*
	Write a function called "range" function that takes two arguments, "start" and "end", and returns
	an array containing all the numbers from "start" up to (and including) "end".

	As a bonus assignment, modify your "range" function to take an optional third argument that
	indicates the "step" value used when building the array. If no step is given, the elements
	go up by increments of one.
*/
function range(start, end, step = 1) {
	let array = []

	if (step < 0)
		for (let i = start; i >= end; i += step)
			array.push(i)
	else
		for (let i = start; i <= end; i += step)
			array.push(i)

	return array
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(range(1, 10))
console.log(range(5, 2, -1))


/*
	Write a function called "sum" function that takes an array of numbers and returns the sum of
	these numbers.
*/
function sum(array) {
	let sum = 0

	for (let number of array)
		sum += number

	return sum
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(sum(range(1, 10)))

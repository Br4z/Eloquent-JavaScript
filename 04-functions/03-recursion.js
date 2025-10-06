/*
	Define a recursive function "is_even" corresponding to this description. The function should
	accept a single parameter (a positive, whole number) and return a Boolean.

	Help:

	- Zero is even.

	- One is odd.

	- For any other number "N", its evenness is the same as "N - 2".

	- "-N" and "N" have the same primality.
*/
function is_even(n) {
	if (n < 0)
		return is_even(-n)
	else if (n == 0)
		return true
	else if (n == 1)
		return false
	else
		return is_even(n - 2)
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(is_even(50))
console.log(is_even(75))
console.log(is_even(-1))

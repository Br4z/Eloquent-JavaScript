/*
	Say you have a function "primitive_multiply" that in 20 percent of cases multiplies two numbers and in the
	other 80 percent of cases raises an exception of type "MultiplicatorUnitFailure". Write a function that
	wraps this clunky function and just keeps trying until a call succeeds, after which it returns the
	result.
*/

class MultiplicatorUnitFailure extends Error { }

function primitive_multiply(a, b) {
	if (Math.random() < 0.2)
		return a * b
	else
		throw new MultiplicatorUnitFailure("Klunk")
}

function reliable_multiply(a, b) {
	try {
		return primitive_multiply(a, b)
	} catch (e) {
		if (e instanceof MultiplicatorUnitFailure)
			return reliable_multiply(a, b)
		else
			throw e
	}
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(reliable_multiply(8, 8))

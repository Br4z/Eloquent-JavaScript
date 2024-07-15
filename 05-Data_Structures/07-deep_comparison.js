/*
	Write the function "deep_equal" that takes two values and returns true only if they are the
	same value or are objects with the same properties, where the values of the properties are
	equal when compared with a recursive call to "deep_equal".
*/
function deep_equal(a, b) {
	if (a === b)
		return true
	else if (a == null || typeof a != "object" ||
			b == null || typeof b != "object")
		return false // null is an object
	else {
		let keys_a = Object.keys(a), keys_b = Object.keys(b)

		if (keys_a.length != keys_b.length)
			return false

		for (let key of keys_a)
			if (!keys_b.includes(key) || !deep_equal(a[key], b[key]))
				return false // If none of the calls return true, that means that
			// the objects are the same

		return true
	}
}

/* ---------------------------------- TESTS --------------------------------- */

let obj = { here: { is: "an" }, object: 2 }
console.log(deep_equal(obj, obj))
console.log(deep_equal(obj, { here : 1, object : 2 }))
console.log(deep_equal(obj, { here : { is: "an" }, object : 2 }))

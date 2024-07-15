/*
	Write a function called "with_box_unlocked" that takes a function value as argument, unlocks the
	box, runs the function, and then ensures that the box is locked again before returning, regardless
	of whether the argument function returned normally or threw an exception.

	For extra points, make sure that if you call "with_box_unlocked" when the box is already unlocked, the box
	stays unlocked.
*/
const box = new class {
	locked = true
	#content = []


	unlock() { this.locked = false }
	lock() { this.locked = true }

	get content() {
		if (this.locked)
			throw new Error("Locked!")
		else
			return this.#content
	}
}

function with_box_unlocked(body) {
	if (box.locked)
		box.unlock()

	try {
		return body()
	} finally {
		box.lock()
	}
}

with_box_unlocked(function () {
	box.content.push("gold piece")
})

try {
	with_box_unlocked(function () {
		throw new Error("Pirates on the horizon! Abort!")
	})
} catch (e) {
	console.log("Error raised: " + e)
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(box.locked)

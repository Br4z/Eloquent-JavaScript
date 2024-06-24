/*
	Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values. Like Group,
	it has "add", "delete", and "has" methods.

	Its add method, however, should return a new PGroup instance with the given member added and leave the old
	one unchanged. Similarly, delete creates a new instance without a given member.
*/

class PGroup {
	constructor(members) {
		this.members = members
	}

	add(value) {
		if (this.has(value))
			return this
		else
			return new PGroup(this.members.concat(value))
	}

	delete(value) {
		if (this.has(value)) {
			let new_members = this.members.filter(e => e != value)
			return new PGroup(new_members)
		} else
			return this
	}

	has(value) {
		return this.members.includes(value)
	}

	static empty = new PGroup([])
}

/* ---------------------------------- TESTS --------------------------------- */

let a = PGroup.empty.add("a")
let ab = a.add("b")
let b = ab.delete("a")

console.log(b.has("b")) // true
console.log(a.has("b")) // false
console.log(b.has("a")) // false

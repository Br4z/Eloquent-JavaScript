require("./iterable_groups")


/*
	Write a class called "Group" (since Set is already taken). Like"Set", it has "add", "delete", and "has" methods.
	Its constructor creates an empty group, add adds a value to the group (but only if it isn't already a member),
	delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating
	whether its argument is a member of the group.

	Give the class a static "from" method that takes an iterable object as argument and creates a group that
	contains all the values produced by iterating over it.
*/

class Group {
	constructor() {
		this.members = []
	}

	add(element) {
		if (!this.has(element))
			this.members.push(element)
	}

	delete(element) {
		let element_index = this.members.indexOf(element)

		if (element_index != -1) // When indexOf returns "-1"
			this.members.splice(element_index, 1)

		// this.members = this.members.filter(v => v !== value)
	}

	has(element) {
		return this.members.includes(element)
	}

	static from(collection) {
		let group = new Group()

		for (let element of collection)
			group.add(element)

		return group
	}

	[Symbol.iterator]() {
		return new GroupIterator(this)
	}
}

/* ---------------------------------- TESTS --------------------------------- */

// let group = Group.from([10, 20])

// console.log(group.has(10)) // true
// console.log(group.has(30)) // false
// group.add(10)
// group.delete(10)
// console.log(group.members)
// console.log(group.has(10)) // false


/* ---------------------------------- TEST ---------------------------------- */

// for (let value of Group.from(["a", "b", "c"])) {
// 	console.log(value)
// }

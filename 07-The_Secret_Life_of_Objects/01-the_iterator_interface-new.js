export default class List {
	constructor(value, rest) {
		this.value = value
		this.rest = rest
	}


	get length() {
		return 1 + (this.rest ? this.rest.length : 0)
	}


	[Symbol.iterator] = function () {
		return new ListIterator(this)
	}


	static from_array(array) {
		let list = null

		if (array.length == 0)
			return list
		else
			list = new this(array.shift(), this.from_array(array))

		return list
	}
}

class ListIterator {
	constructor(list) {
		this.list = list
	}


	next() {
		if (this.list == null)
			return { done: true }

		const value = this.list.value
		this.list = this.list.rest
		return { value, done: false }
	}
}

/* ---------------------------------- TEST ---------------------------------- */

// let list = List.from_array([1, 2, 3])
// for (let element of list)
// 	console.log(element)

// console.log([...list])

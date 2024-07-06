class GroupIterator {
	#members
	#index

	constructor(members) {
		this.#index = 0
		this.#members = members
	}


	next() {
		if (this.#index >= this.#members.length)
			return { done: true }
		else {
			let result = { value: this.#members[this.#index], done: false }
			this.#index++
			return result
		}
	}
}


module.exports = { GroupIterator }

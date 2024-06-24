class GroupIterator {
	constructor(group) {
		this.index = 0
		this.group = group
	}

	next() {
		let members = this.group.members

		if (this.index >= members.length)
			return { done: true } // ">=" in case the index exceeds the members.length
		else {
			let value = { index: this.index, value: members[this.index] }
			this.index++
			return { value, done: false }
		}
	}
}


global.GroupIterator = GroupIterator

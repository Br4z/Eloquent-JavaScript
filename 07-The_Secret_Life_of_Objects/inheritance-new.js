const { List } = require("./the_iterator_interface-new.js")


class LengthList extends List {
	#length

	constructor(value, rest) {
		super(value, rest)
		this.#length = super.length
	}


	get length() {
		return this.#length
	}
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(LengthList.from_array([1, 2, 3]).length);

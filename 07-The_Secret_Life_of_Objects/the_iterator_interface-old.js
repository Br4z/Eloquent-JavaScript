class Matrix {
	constructor(width, height, element = (x, y) => undefined) {
		this.width = width
		this.height = height
		this.content = []

		// Array to matrix conversion
		for (let y = 0; y < height; y++)
			for (let x = 0; x < width; x++)
				this.content[y * width + x] = element(x, y)
	}

	get(x, y) {
		return this.content[y * this.width + x]
	}

	set(x, y, value) {
		this.content[y * this.width + x] = value
	}

	static show(matrix) {
		const width = matrix.width
		const height = matrix.height

		for (let y = 0; y < height; y++) {
			let row = ""

			for (let x = 0; x < width; x++)
				row += matrix.get(x, y) + " "

			console.log(row)
		}
	}
}


class MatrixIterator {
	constructor(matrix) {
		this.x = 0
		this.y = 0
		this.matrix = matrix
	}

	next() {
		if (this.y == this.matrix.height)
			return { done: true } // Reaches the size of the rows, which means the end of the matrix
		else {
			let value = { x: this.x, y: this.y, value: this.matrix.get(this.x, this.y) }

			this.x++

			if (this.x == this.matrix.width) { // Reaches the column's size
				this.x = 0
				this.y++
			}

			return { value, done: false }
		}
	}
}

Matrix.prototype[Symbol.iterator] = function () {
	return new MatrixIterator(this)
}

/* ---------------------------------- TEST ---------------------------------- */

// let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`)

// for (let { x, y, value } of matrix)
// 	console.log(x, y, value)


module.exports = { Matrix }

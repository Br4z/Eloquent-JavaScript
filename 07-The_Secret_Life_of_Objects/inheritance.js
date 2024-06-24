require("./the_iterator_interface")


class SymmetricMatrix extends Matrix {
	constructor(size, element = (x, y) => undefined) {
		super(size, size,
			(x, y) => {
				if (x < y) // x > y
					return element(y, x) // Lower diagonal
				else
					return element(x, y) // Upper diagonal (and the diagonal)
			}
		)
	}

	set(x, y, value) {
		super.set(x, y, value)
		super.set(y, x, value)
	}
}

const size = 3
let symmetricMatrix = new SymmetricMatrix(size, (x, y) => `(${x}, ${y})`)
Matrix.show(symmetricMatrix)


function symmetry_checker(matrix) {
	let symmetric = true

	// Check diagonals
	for (let y = 1; y < size; y++) {
		for (let x = 0; x < y; x++) {
			if (matrix.get(x, y) != matrix.get(y, x)) {
				symmetric = false
				break
			}
		}
		if (!symmetric)
			break
	}
	return symmetric
}


/* ---------------------------------- TEST ---------------------------------- */

console.log(symmetry_checker(symmetricMatrix))

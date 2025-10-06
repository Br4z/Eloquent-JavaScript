/*
	Write a class "Vector" that represents a vector in two - dimensional space. It takes "x" and "y"
	parameters (numbers), which it should save to properties of the same name.

	- Give the "Vector" prototype two methods, "plus" and "minus", that take another vector as a
	parameter  and return a new vector that has the sum or difference of the two vectors
	(this and the parameter) "x" and "y" values.

	- Add a getter property length to the prototype that computes the length of the vector—that
	is, the  distance of the point (x, y) from the origin (0, 0).
*/
class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}


	plus(vector) {
		const x = vector.x, y = vector.y
		return new Vector(this.x + x, this.y + y)
	}

	minus(vector) {
		const x = vector.x, y = vector.y
		return new Vector(this.x - x, this.y - y)
	}

	get length() {
		const x = this.x, y = this.y
		return Math.sqrt(x * x + y * y)
	}
}

/* ---------------------------------- TESTS --------------------------------- */

console.log(new Vector(1, 2).plus(new Vector(2, 3)))
console.log(new Vector(1, 2).minus(new Vector(2, 3)))
console.log(new Vector(3, 4).length)

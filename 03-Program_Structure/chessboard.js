/*
	Write a program that creates a string that represents a 8x8 grid, using newline characters
	to separate lines.At each position of the grid, there is either a space or a "#" character.
	The characters should form a chessboard.

	Example:

	 # # # #
	# # # #
	 # # # #
	# # # #
	 # # # #
	# # # #
	 # # # #
	# # # #
*/
var size = 8
var chessboard = ""

for (let i = 0; i < size; i++) {
	for (let j = 0; j < size; j++)
		if ((i + j) % 2 == 0)
			chessboard += " "
		else
			chessboard += "#"

	chessboard += "\n"
}

console.log(chessboard)

let input = "A string with 3 numbers in it... 42 and 88."
let number = /\b\d+\b/g
let match

while (match = number.exec(input))
	console.log("Found", match[0], "at", match.index)

let matches = input.matchAll(/\b\d+\b/g)
for (let match of matches)
	console.log("Found", match[0], "at", match.index)


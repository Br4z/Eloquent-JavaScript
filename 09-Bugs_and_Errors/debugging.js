/* -------------------------------- Debugging -------------------------------- */

function convert_number(decimal_number, base = 10) {
	let result = "", sign = ""

	if (decimal_number < 0) {
		sign = "-"
		decimal_number = -decimal_number
	}

	do {
		result = String(decimal_number % base) + result
		decimal_number = Math.floor(decimal_number / base) // (n - n % base) / base
	} while (decimal_number > 0)

	return sign + result
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(convert_number(11, 10))

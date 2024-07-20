function minusOne(match, amount, unit) {
	amount = Number(amount) - 1

	if (amount == 1) // only one left, remove the 's'
		unit = unit.slice(0, unit.length - 1)
	else if (amount == 0)
		amount = "no"

	return amount + " " + unit
}

/* ---------------------------------- TEST ---------------------------------- */

// let stock = "1 lemon, 2 cabbages, and 101 eggs"
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne)) // no lemon, 1 cabbage, and 100 eggs

function stripComments(code) {
	return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "")
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(stripComments("1 /* a */+/* b */ 1")) //  1 + 1

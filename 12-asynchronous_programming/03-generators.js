function* powers(n) {
	for (let current = n; ; current *= n)
		yield current
}

/* ---------------------------------- TEST ---------------------------------- */

for (let power of powers(3)) {
	if (power > 50)
		break
	console.log(power)
}

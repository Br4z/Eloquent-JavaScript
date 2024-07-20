function parse_INI(string) {
	let result = {}
	let section = result

	for (let line of string.split(/\r?\n/)) {
		let match
		if (match = line.match(/^(\w+)=(.*)$/))
			section[match[1]] = match[2]
		else if (match = line.match(/^\[(.*)\]$/))
			section = result[match[1]] = {}
		else if (!/^\s*(|$)/.test(line))
			throw new Error("Line '" + line + "' is not valid.")
	}
	return result
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(parse_INI(`
name=Vasilis
[address]
city=Tessaloniki`)) // {name: "Vasilis", address: {city: "Tessaloniki"}}

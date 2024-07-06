const { SCRIPTS } = require("./SCRIPTS.js")


function character_script(code) {
	for (let script of SCRIPTS)
		if (script.ranges.some(([from, to]) => { return code >= from && code < to }))
			return script

	return null
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(character_script(121))


module.exports = { character_script }

import { SCRIPTS } from "./01-SCRIPTS.js"


export function character_script(code) {
	for (let script of SCRIPTS)
		if (script.ranges.some(([from, to]) => { return code >= from && code < to }))
			return script

	return null
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(character_script(121))

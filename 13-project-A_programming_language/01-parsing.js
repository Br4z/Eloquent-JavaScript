function parse_expression(program) {
	program = skip_space(program)

	let match, expr
	if (match = /^"([^"]*)"/.exec(program)) // String
		expr = { type: "value", value: match[1] }
	else if (match = /^\d+\b/.exec(program)) // Number
		expr = { type: "value", value: Number(match[0]) }
	else if (match = /^[^\s(),#"]+/.exec(program)) // Aplication
		expr = { type: "word", name: match[0] }
	else
		throw new SyntaxError("Unexpected syntax: " + program)

	return parse_apply(expr, program.slice(match[0].length))
}

function skip_space(string) {
	let regex = /(\s|#.*)*/g
	return string.replace(regex, "")
}

function parse_apply(expr, program) {
	program = skip_space(program)

	if (program[0] != "(")
		return { expr: expr, rest: program }
	else {
		program = skip_space(program.slice(1)) // Without the "("
		expr = { type: "apply", operator: expr, args: [] }
		while (program[0] != ")") {
			let arg = parse_expression(program)
			expr.args.push(arg.expr)
			program = skip_space(arg.rest)

			if (program[0] == ",")
				program = skip_space(program.slice(1))
			else if (program[0] != ")")
				throw new SyntaxError("Expected \",\" or \")\"")
		}
		return parse_apply(expr, program.slice(1)) // For the final ")"
	}
}

export default function parse(program) {
	let { expr, rest } = parse_expression(program)

	if (skip_space(rest).length > 0)
		throw new SyntaxError("Unexpected text after program")

	return expr
}

/* ---------------------------------- TEST ---------------------------------- */

// const result = parse("+(a, 10)")
// console.log(JSON.stringify(result, null, 2))

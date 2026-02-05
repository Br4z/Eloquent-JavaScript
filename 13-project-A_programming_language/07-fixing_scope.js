import { evaluate } from "./02-the_evaluator.js"
import { run } from "./04-the_environment.js"
import special_forms from "./05-functions.js"


special_forms.set = (args, scope) => {
	if (args.length != 2 || args[0].type != "word")
		throw new SyntaxError("Incorrect use of set")

	let var_name = args[0].name
	let new_value = evaluate(args[1], scope)

	for (; scope; scope = Object.getPrototypeOf(scope))
		if (Object.hasOwn(scope, var_name)) {
			scope[var_name] = new_value
			return new_value
		}

	throw new ReferenceError(`Error: setting undefined variable ${var_name}`)
}

/* ---------------------------------- TEST ---------------------------------- */

let program = `
do(define(x, 4),
	define(set_x, fun(val, set(x, val))),
	set_x(50),
	print(x))
`
run(program)

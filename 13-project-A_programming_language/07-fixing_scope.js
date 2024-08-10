import { evaluate } from "./02-the_evaluator.js"
import { run } from "./04-the_environment.js"
import special_forms from "./05-functions.js"


special_forms.set = (args, scope) => {
	console.log(args)
	if (args.length != 2 || args[0].type != "word")
		throw new SyntaxError("Incorrect use of set")

	let var_name = args[0].name
	let new_value = evaluate(args[1], scope)

	for (let scope_ = scope; scope_; scope_ = Object.getPrototypeOf(scope_))
		if (Object.hasOwn(scope_, var_name)) {
			scope_[var_name] = new_value
			return new_value
		}

	throw new ReferenceError(`Error: setting undefined variable ${var_name}`)
}

/* ---------------------------------- TEST ---------------------------------- */

let program = `
do(define(x, 4),
	define(setx, fun(val, set(x, val))),
	setx(50),
	print(x))
`
run(program)

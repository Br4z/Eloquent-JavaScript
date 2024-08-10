import { evaluate } from "./02-the_evaluator.js"
import special_forms from "./03-special_forms.js"
import { run } from "./04-the_environment.js"


special_forms.fun = (args, scope) => {
	const args_length = args.length

	if (!args_length)
		throw new SyntaxError("Functions need a body")

	let body = args[args_length - 1]
	let params = args.slice(0, args_length - 1).map(expr => {
		if (expr.type != "word")
			throw new SyntaxError("Parameter names must be words")
		return expr.name
	})

	return function (...args) {
		if (args.length != params.length)
			throw new TypeError("Wrong number of arguments")

		let local_scope = Object.create(scope)

		for (let i = 0; i < args.length; i++)
			local_scope[params[i]] = args[i]

		return evaluate(body, local_scope)
	}
}

/* ---------------------------------- TESTS --------------------------------- */

// let program = `
// do(define(plusOne, fun(a, +(a, 1))),
// 	print(plusOne(10)))
// `
// run(program)

// program = `
// do(define(pow, fun(base, exp,
// 		if(==(exp, 0),
// 			1,
// 			*(base, pow(base, -(exp, 1)))))),
// 	print(pow(2, 10)))
// `
// run(program)


export default special_forms

import parse from "./01-parsing.js"
import { evaluate, special_forms } from "./02-the_evaluator.js"


special_forms.if = (args, scope) => {
	if (args.length != 3)
		throw new SyntaxError("Wrong number of args to if")

	return evaluate(args[0], scope) !== false ? evaluate(args[1], scope) :
				evaluate(args[2], scope)
}

special_forms.while = (args, scope) => {
	if (args.length != 2)
		throw new SyntaxError("Wrong number of args to while")

	while (evaluate(args[0], scope) !== false)
		evaluate(args[1], scope)

	// Since undefined does not exist in Egg, we return false,
	// for lack of a meaningful result
	return false
}

special_forms.do = (args, scope) => {
	let value = false
	for (let arg of args)
		value = evaluate(arg, scope)

	return value
}

special_forms.define = (args, scope) => {
	if (args.length != 2 || args[0].type != "word")
		throw new SyntaxError("Incorrect use of define")

	let value = evaluate(args[1], scope)
	scope[args[0].name] = value
	return value
}


export default special_forms

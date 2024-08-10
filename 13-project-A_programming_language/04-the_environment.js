import parse from "./01-parsing.js"
import { evaluate } from "./02-the_evaluator.js"


export const scope = Object.create(null)

scope.true = true
scope.false = false

let program = parse("if(true, false, true)")
// console.log(evaluate(program, scope))

/* -------------------------------------------------------------------------- */

for (let operator of ["+", "-", "*", "/", "==", "<", ">"])
	scope[operator] = Function("a, b", `return a ${operator} b;`)

scope.print = value => {
	console.log(value)
	return value
}

export function run(program) {
	return evaluate(parse(program), Object.create(scope))
}


/* ---------------------------------- TEST ---------------------------------- */

// program = `
// do(define(total, 0),
// 	define(count, 1),
// 	while(<(count, 11),
// 			do(define(total, +(total, count)),
// 			define(count, +(count, 1)))),
// 	print(total))
// `
// run(program)
// console.log(JSON.stringify(parse(program), null, 2))

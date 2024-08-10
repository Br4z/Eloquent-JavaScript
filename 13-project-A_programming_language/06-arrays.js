import { run, scope } from "./04-the_environment.js"


scope.array = (...elements) => elements
scope.length = (array) => array.length
scope.element = (array, index) => array[index]

/* ---------------------------------- TEST ---------------------------------- */

// run(`
// do(define(sum, fun(array,
// 	do(define(i, 0),
// 		define(sum, 0),
// 		while(<(i, length(array)),
// 			do(define(sum, +(sum, element(array, i))),
// 				define(i, +(i, 1)))),
// 		sum))),
// 	print(sum(array(1, 2, 3))))
// `)


export default scope

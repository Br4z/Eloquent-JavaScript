// Can you think of a way to call hasOwnProperty on an object that has its own property by that name?

let map = { one: true, two: true, hasOwnProperty: true }


console.log(Object.prototype.hasOwnProperty.call(map, "one")) // true
// We replace the "this" (in the call) for our map to use the original function

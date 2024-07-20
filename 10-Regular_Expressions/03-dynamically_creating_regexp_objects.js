let name = "dea+hl[]rd"
let escaped = name.replace(/[[\.+*?(){|^$]/g, "\\$&")
let regexp = new RegExp("(^|\\s)" + escaped + "(^|\\s)", "gi")
let text = "This dea+hl[]rd guy is super annoying."

/* ---------------------------------- TEST ---------------------------------- */

console.log(regexp);
console.log(escaped);
console.log(text.replace(regexp, "_$&_")) // This _dea+hl[]rd_ guy is super annoying.

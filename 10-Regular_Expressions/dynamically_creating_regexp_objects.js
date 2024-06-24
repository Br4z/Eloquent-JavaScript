let name = "dea+hl[]rd"
let text = "This dea+hl[]rd guy is super annoying."
let escaped = name.replace(/[[\.+*?(){|^$]/g, "\\$&")
let regexp = new RegExp("\\b" + escaped + "\\b", "gi") // "gi" for global and case insensitive.

/* ---------------------------------- TEST ---------------------------------- */

console.log(escaped);
console.log(text.replace(regexp, "_$&_")) // This _dea+hl[]rd_ guy is super annoying.

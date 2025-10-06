/*
	Replace all the dialogue quotes with double quotes, while keeping the single quotes used in contractions
	like "aren't".
*/

let text = "'I'm the cook,' he said, 'it's my job.'"

/* ---------------------------------- TEST ---------------------------------- */

console.log(text.replace(/(^|\p{L})'|'(\p{L}|$)/ug, "$1\"$2"))

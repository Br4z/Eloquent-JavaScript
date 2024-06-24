// Replace all the dialogue quotes with double quotes, while keeping the single quotes used in contractions like "aren't".

let text = "'I'm the cook,' he said, 'it's my job.'"

/* ---------------------------------- TEST ---------------------------------- */

console.log(text.replace(/(^|\W)'|'(\W|$)/g, "$1\"$2"))


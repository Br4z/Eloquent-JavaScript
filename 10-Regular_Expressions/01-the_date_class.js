function get_date(string) {
	let [_, month, day, year] =
		/^(\d{1,2})-(\d{1,2})-(\d{4})\b/.exec(string)
	return new Date(year, month - 1, day)
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(get_date("11-30-2003")) // Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

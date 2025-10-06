const ordinal = require("ordinal")
const { days, months } = require("date-names")

function format_date(date, format) {
	return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
		if (tag == "YYYY")
			return date.getFullYear()
		if (tag == "M")
			return date.getMonth()
		if (tag == "MMMM")
			return months[date.getMonth()]
		if (tag == "D")
			return date.getDate()
		if (tag == "Do")
			return ordinal(date.getDate())
		if (tag == "dddd")
			return days[date.getDay()]
	})
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(format_date(new Date(2017, 9, 13), "dddd the Do")) // Friday the 13th

import text_file from "./05-asynchronous_bugs.js"


export default function activity_graph(table) {
	let widest = Math.max(50, Math.max(...table))
	return table.map((n, i) => {
		let width = (n / widest) * 20
		let full = Math.floor(width), rest = " ▏▎▍▌▋▊▉"[Math.floor((width - full) * 8)]
		return String(i).padStart(2, " ") + " " + "█".repeat(full) + rest
	}).join("\n")
}

async function activity_table(day) {
	let table = Array(24).fill(0)
	const log_files = await text_file("camera_logs.txt")

	for (let log of log_files.split("\n")) {
		const log_content = await text_file(log)

		for (let timestamp of log_content.split("\n")) {
			const date = new Date(parseInt(timestamp))

			if (date.getDay() == day)
				table[date.getHours()]++
		}
	}

	return table
}

/* ---------------------------------- TEST ---------------------------------- */

// activity_table(0)
// 	.then(table => console.log(activity_graph(table)))

import text_file from "./05-asynchronous_bugs.js"
import activity_graph from "./06-quiet_times.js"


function activity_table(day) {
	let table = Array(24).fill(0)

	return text_file("camera_logs.txt").then(files => {
		return Promise.all(files.split("\n").map(log => {
			return text_file(log).then(log_content => {
				for (let timestamp of log_content.split("\n")) {
					const date = new Date(parseInt(timestamp))
					if (date.getDay() == day)
						table[date.getHours()]++
				}
			})
		}))
	}).then(() => table)
}

/* ---------------------------------- TEST ---------------------------------- */

activity_table(0)
	.then(table => console.log(activity_graph(table)))

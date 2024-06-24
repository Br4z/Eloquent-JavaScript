import { run_robot } from "./robots.js"
import { VillageState } from "./state.js"


export default function compare_robots(robot1, memory1, robot2, memory2) {
	let total1 = 0, total2 = 0

	for (let i = 0; i < 100; i++) {
		let initial_state = VillageState.random()

		total1 += run_robot(initial_state, robot1, memory1)
		total2 += run_robot(initial_state, robot2, memory2)
	}
	console.log(`Robot 1 needed ${total1 / 100} steps per task`)
	console.log(`Robot 2 needed ${total2 / 100} steps per task`)
}

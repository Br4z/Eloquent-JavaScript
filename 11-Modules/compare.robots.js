import { dijkstrajs_graph } from "./roads.js"
import { run_robot, VillageState } from "./state.js"


export function compare_robots(robot_1, memory_1, robot_2, memory_2) {
	const iterations = 100
	let total_robot_1 = 0, total_robot_2 = 0

	for (let i = 0; i < iterations; i++) {
		const state = VillageState.random(dijkstrajs_graph)

		total_robot_1 += run_robot(state, robot_1, memory_1, dijkstrajs_graph)
		total_robot_2 += run_robot(state, robot_2, memory_2, dijkstrajs_graph)
	}

	console.log(`Iterations: ${iterations}`)
	console.log(`Robot 1 average: ${total_robot_1 / iterations}\tRobot 2 average: ${total_robot_2 / iterations}`)
}

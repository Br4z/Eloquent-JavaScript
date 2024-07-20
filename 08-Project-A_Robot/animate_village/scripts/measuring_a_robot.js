import { goal_oriented_robot } from "./pathfinding.js"
import { run_robot } from "./simulation.js"
import route_robot from "./the_mail_trucks_route.js"
import VillageState from "./the_task.js"


/*
	Write a function "compare_robots" that takes two robots (and their starting memory). It should generate
	100 tasks and let each of the robots solve each of these tasks. When done, it should output the average
	number of steps each robot took per task.
*/
export default function compare_robots(robot_1, memory_1, robot_2, memory_2) {
	const iterations = 100
	let total_robot_1 = 0, total_robot_2 = 0

	for (let i = 0; i < iterations; i++) {
		const state = VillageState.random()

		total_robot_1 += run_robot(state, robot_1, memory_1)
		total_robot_2 += run_robot(state, robot_2, memory_2)
	}

	console.log(`Iterations: ${iterations}`)
	console.log(`Robot 1 average: ${total_robot_1 / iterations}\tRobot 2 average: ${total_robot_2 / iterations}`)
}

/* ---------------------------------- TEST ---------------------------------- */

// compare_robots(route_robot, [], goal_oriented_robot, [])

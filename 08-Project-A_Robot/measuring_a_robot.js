require("./pathfinding")


/*
	Write a function "compare_robots" that takes two robots (and their starting memory). It should generate
	100 tasks and let each of the robots solve each of these tasks. When done, it should output the average
	number of steps each robot took per task.
*/

function compare_robots(robot1, memory1, robot2, memory2) {
	let total1 = 0, total2 = 0

	for (let i = 0; i < 100; i++) {
		let initial_state = VillageState.random()

		total1 += run_robot(initial_state, robot1, memory1)
		total2 += run_robot(initial_state, robot2, memory2)
	}
	console.log(`Robot 1 needed ${total1 / 100} steps per task`)
	console.log(`Robot 2 needed ${total2 / 100} steps per task`)
}

/* ---------------------------------- TEST ---------------------------------- */

// compare_robots(route_robot, [], goal_oriented_robot, [])


global.compare_robots = compare_robots

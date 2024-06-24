require("./the_task.js")


function run_robot(state, robot, memory) {
	for (let turn = 0;  ;turn++) {
		if (state.parcels.length == 0) {
			// console.log(`Done in ${turn} turns`)
			return turn;
		}

		let action = robot(state, memory)
		state = state.move(action.direction)
		memory = action.memory
		// console.log(`Moved to ${action.direction}`)
	}
}

function random_pick(array) {
	let choice = Math.floor(Math.random() * array.length)
	return array[choice]
}

function random_robot(state) { // This robot does not need memory
	return { direction: random_pick(road_graph[state.place]) } // roadGraph[state.place] = roads available
}

VillageState.random = function (parcel_count = 5) {
	let parcels = []

	for (let i = 0; i < parcel_count; i++) {
		let address = random_pick(Object.keys(road_graph))
		let place

		do {
			place = random_pick(Object.keys(road_graph))
		} while (place == address) // To avoid creating parcels at their destinations
		parcels.push({ place, address })
	}
	return new VillageState("Post Office", parcels) // We always start at the "Post Office"
}

/* ---------------------------------- TEST ---------------------------------- */

// run_robot(VillageState.random(), random_robot)


global.run_robot = run_robot

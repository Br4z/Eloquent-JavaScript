require("./simulation.js")


const mail_route = [ // Takes maximum 26 turns (twice the 13-step route)
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
]

function route_robot(state, memory) {
	if (memory.length == 0)
		memory = mail_route

	return { direction: memory[0], memory: memory.slice(1) }
}

/* ---------------------------------- TEST ---------------------------------- */

// run_robot(VillageState.random(), route_robot, [])


global.route_robot = route_robot

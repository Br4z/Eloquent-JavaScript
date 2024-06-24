require("./the_mail_truck's_route.js")


function find_route(graph, from, to) { // Always found a route, because all the places are connected
	let work = [{ at: from, route: [] }]

	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i]

		for (let place of graph[at]) {
			if (place == to)
				return route.concat(place) // Path found
			if (!work.some((w) => w.at == place)) // Path not found
				work.push({ at: place, route: route.concat(place) })
		}
	}
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(find_route(road_graph, "Alice's House", "Town Hall"))


function goal_oriented_robot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0]

		if (parcel.place != place) // Pick up selected parcel
			route = find_route(road_graph, place, parcel.place)
		else // Deliver selected package
			route = find_route(road_graph, place, parcel.address)
	}

	return { direction: route[0], memory: route.slice(1) }
}

/* ---------------------------------- TEST ---------------------------------- */

// run_robot(VillageState.random(), goal_oriented_robot, [])


global.find_route = find_route
global.goal_oriented_robot = goal_oriented_robot

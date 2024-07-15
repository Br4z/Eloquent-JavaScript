import { road_graph } from "./meadowfield.js"
import { VillageState } from "./the_task.js"
import { run_robot } from "./simulation.js"


export function find_route(graph, from, to) { // Always found a route, because all the places are connected
	let work = [{ at: from, route: [] }]

	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i]

		for (let place of graph[at]) {
			if (place == to)
				return route.concat(place) // Path found
			if (!work.some(w => w.at == place)) // Avoid exploring the same path twice
				work.push({ at: place, route: route.concat(place) })
		}
	}
}

/* ---------------------------------- TEST ---------------------------------- */

// console.log(find_route(road_graph, "Alice's House", "Town Hall"))


export function goal_oriented_robot({ place, parcels }, route) {
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

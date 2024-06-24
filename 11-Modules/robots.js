import find_route from "./find_route.js"
import { road_graph, dijkstrajs_graph } from "./roads.js"
import dijkstrajs from "dijkstrajs"
const { find_path } = dijkstrajs;



export function run_robot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			return turn;
		}

		let action = robot(state, memory)
		state = state.move(action.direction)
		memory = action.memory
	}
}


export function random_robot(state) {
	return { direction: random_pick(road_graph[state.place]) }
}


const mail_route = [
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
]

export function route_robot(state, memory) {
	if (memory.length == 0)
		memory = mail_route

	return { direction: memory[0], memory: memory.slice(1) }
}


export function goal_oriented_robot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0]

		if (parcel.place != place)
			route = find_path(dijkstrajs_graph, place, parcel.place) // find_route(road_graph, place, parcel.place),
		else
			route = find_path(dijkstrajs_graph, place, parcel.address) // find_route(road_graph, place, parcel.address),
	}

	return { direction: route[0], memory: route.slice(1) }
}


export function smart_robot({ place, parcels }, route) {
	let routes = parcels.map(parcel => {
		if (parcel.place != place)
			return {
				route: find_path(dijkstrajs_graph, place, parcel.place), // find_route(road_graph, place, parcel.place),
				pick_up: true
			}
		else
			return {
				route: find_path(dijkstrajs_graph, place, parcel.address), // find_route(road_graph, place, parcel.address),
				pick_up: false
			}
	})

	function score({ route, pick_up }) {
		return (pick_up ? 0.5 : 0) - route.length
	}

	route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route

	return { direction: route[0], memory: route.slice(1) }
}

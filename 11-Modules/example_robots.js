import dijkstrajs from "dijkstrajs"
import random_pick from "./random_pick.js"
const { find_path } = dijkstrajs


export function random_robot(state, memory, graph) {
	return { direction: random_pick(Object.keys(graph[state.place])) }
}


const mail_route = [
	"Alice's House", "Cabin", "Alice's House", "Bob's House",
	"Town Hall", "Daria's House", "Ernie's House",
	"Grete's House", "Shop", "Grete's House", "Farm",
	"Marketplace", "Post Office"
]

export function route_robot(state, memory, graph) {
	if (memory.length == 0)
		memory = mail_route

	return { direction: memory[0], memory: memory.slice(1) }
}


export function goal_oriented_robot({ place, parcels }, route, graph) {
	if (route.length == 0) {
		let parcel = parcels[0]

		if (parcel.place != place)
			route = find_path(graph, place, parcel.place)
		else
			route = find_path(graph, place, parcel.address)
	}

	return { direction: route[0], memory: route.slice(1) }
}


export function lazy_robot({ place, parcels }, route, graph) {
	if (route.length == 0) {
		const parcels_routes = parcels.map(parcel => {
					if (parcel.place != place)
						return {
							route: find_path(graph, place, parcel.place),
							pick_up: true
						}
					else
						return {
							route: find_path(graph, place, parcel.address),
							pick_up: false
						}
				}
			)

		function score({ route, pick_up }) {
			return (pick_up ? 0.5 : 0) - route.length
		}

		route = parcels_routes.reduce((a, b) => score(a) > score(b) ? a : b).route
	}

	return { direction: route[0], memory: route.slice(1) }
}

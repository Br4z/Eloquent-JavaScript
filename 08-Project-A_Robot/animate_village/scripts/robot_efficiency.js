import road_graph from "./meadowfield.js"
import compare_robots from "./measuring_a_robot.js"
import { find_route, goal_oriented_robot } from "./pathfinding.js"


// Write a robot that finishes the delivery task faster than goal_oriented_robot
export default function lazy_robot({ place, parcels }, route) {
	if (route.length == 0) {
		const parcels_routes = parcels.map(parcel => {
				if (parcel.place != place)
					return {
						route: find_route(road_graph, place, parcel.place),
						pick_up: true
					}
				else
					return {
						route: find_route(road_graph, place, parcel.address),
						pick_up: false
					}
			}
		)

		function score({ route, pick_up }) { // Scoring possible routes
			return (pick_up ? 0.5 : 0) - route.length
		}

		route = parcels_routes.reduce((a, b) => score(a) > score(b) ? a : b).route // Selecting the best
	}

	return { direction: route[0], memory: route.slice(1) }
}

/* ---------------------------------- TEST ---------------------------------- */

// compare_robots(lazy_robot, [], goal_oriented_robot, [])

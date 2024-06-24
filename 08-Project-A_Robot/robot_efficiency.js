require("./measuring_a_robot")


// Write a robot that finishes the delivery task faster than goal_oriented_robot

function smart_robot({ place, parcels }, route) {
	let routes = parcels.map(parcel => {
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
	})

	function score({ route, pick_up }) { // Scoring possible routes
		return (pick_up ? 0.5 : 0) - route.length
	}

	route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route // Selecting the best

	return { direction: route[0], memory: route.slice(1) }
}

/* ---------------------------------- TEST ---------------------------------- */

compare_robots(smart_robot, [], goal_oriented_robot, [])


global.smart_robot = smart_robot

import random_pick from "./03-random_pick.js"


export class VillageState {
	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}


	move(destination) {
		if (!road_graph[this.place].includes(destination))
			return this
		else {
			let parcels = this.parcels.map(p => {
						if (p.place != this.place)
							return p
						else
							return { place: destination, address: p.address }
					}
				).filter(p => p.place != p.address)
			return new VillageState(destination, parcels)
		}
	}


	static random(graph, parcel_count=5) {
		let parcels = []

		for (let i = 0; i < parcel_count; i++) {
			let address = random_pick(Object.keys(graph)), place

			do {
				place = random_pick(Object.keys(graph))
			} while (place == address)
			parcels.push({ place, address })
		}
		return new VillageState(graph, "Post Office", parcels)
	}
}


export function run_robot(state, robot, memory) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0)
			return turn

		const action = robot(state, memory)
		state = state.move(action.direction)
		memory = action.memory
	}
}

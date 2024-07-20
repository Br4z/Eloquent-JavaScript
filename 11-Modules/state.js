import random_pick from "./random_pick.js"


export class VillageState {
	constructor(graph, place, parcels) {
		this.graph = graph
		this.place = place
		this.parcels = parcels
	}


	move(destination) {
		if (!this.graph[this.place].hasOwnProperty(destination))
			return this
		else {
			let parcels = this.parcels.map(p => {
				if (p.place != this.place)
					return p
				else
					return { place: destination, address: p.address }
			}
			).filter(p => p.place != p.address)
			return new VillageState(this.graph, destination, parcels)
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


export function run_robot(state, robot, memory, graph) {
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0)
			return turn

		let action = robot(state, memory, graph)
		state = state.move(action.direction)
		memory = action.memory
	}
}

import random_pick from "./random_pick.js"
import { road_graph } from "./roads.js"


export class VillageState {
	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}

	move(destination) {
		if (!road_graph[this.place].includes(destination)) {
			return this
		} else {
			let parcels = this.parcels.map((p) => {
				if (p.place != this.place) return p
				else return { place: destination, address: p.address }
			}).filter((p) => p.place != p.address)
			return new VillageState(destination, parcels)
		}
	}

	static random(parcel_count = 5) {
		let parcels = []

		for (let i = 0; i < parcel_count; i++) {
			let address = random_pick(Object.keys(road_graph))
			let place

			do {
				place = random_pick(Object.keys(road_graph))
			} while (place == address)
			parcels.push({ place, address })
		}
		return new VillageState("Post Office", parcels)
	}
}

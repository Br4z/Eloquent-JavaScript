import road_graph from "./meadowfield.js"


/*
	Let's condense the village's state down to the minimal set of values that define it. There is the
	robot's current location and the collection of undelivered parcels, each of which has a current
	location and a destination address. That is it.
*/
export default class VillageState {
	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}


	move(destination) {
		if (!road_graph[this.place].includes(destination))
			return this // If destinations is not available in that place, then return the preview state
		else {
			let parcels = this.parcels.map(p => { // map takes care of moving the parcels
						if (p.place != this.place)
							return p
						else
							return { place: destination, address: p.address }
					}
				).filter(p => p.place != p.address) // filter takes care of making the delivery
			return new VillageState(destination, parcels)
		}
	}
}

/* ---------------------------------- TEST ---------------------------------- */

// let first = new VillageState(
// 	"Post Office",
// 	[{ place: "Post Office", address: "Alice's House" }]
// )
// let next = first.move("Alice's House")

// console.log(next.place) // Alice's House
// console.log(next.parcels) // []
// console.log(first.place) // Post Office

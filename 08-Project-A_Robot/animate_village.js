(function() {
	"use strict"

	let active = null

	const places = {
		"Alice's House": { x: 279, y: 100 },
		"Bob's House": { x: 295, y: 203 },
		"Cabin": { x: 372, y: 67 },
		"Daria's House": { x: 183, y: 285 },
		"Ernie's House": { x: 50, y: 283 },
		"Farm": { x: 36, y: 118 },
		"Grete's House": { x: 35, y: 187 },
		"Marketplace": { x: 162, y: 110 },
		"Post Office": { x: 205, y: 57 },
		"Shop": { x: 137, y: 212 },
		"Town Hall": { x: 202, y: 213 }
	}
	const placeKeys = Object.keys(places)

	const speed = 2

	class Animation {
		constructor(worldState, robot, robotState) {
			this.worldState = worldState
			this.robot = robot
			this.robotState = robotState
			this.turn = 0

			let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument
			this.node = outer.appendChild(doc.createElement("div"))
			this.node.style.cssText = "position: relative; line-height: 0.1; margin-left: 10px"
			this.map = this.node.appendChild(doc.createElement("img"))
			this.map.src = "http://eloquentjavascript.net/img/village2x.png"
			this.map.style.cssText = "vertical-align: -8px"
			this.robotElt = this.node.appendChild(doc.createElement("div"))
			this.robotElt.style.cssText = `position: absolute; transition: left ${ 0.8 / speed }s, top ${ 0.8 / speed }s;`
			let robotPic = this.robotElt.appendChild(doc.createElement("img"))
			robotPic.src = "http://eloquentjavascript.net/img/robot_moving2x.gif"
			this.parcels = []

			this.text = this.node.appendChild(doc.createElement("span"))
			this.button = this.node.appendChild(doc.createElement("button"))
			this.button.style.cssText = "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family: sans-serif; font-size: 80%"
			this.button.textContent = "Stop"

			this.button.addEventListener("click", () => this.clicked())
			this.schedule()

			this.updateView()
			this.updateParcels()

			this.robotElt.addEventListener("transitionend", () => this.updateParcels())
		}


		updateView() {
			let pos = places[this.worldState.place]
			this.robotElt.style.top = (pos.y - 38) + "px"
			this.robotElt.style.left = (pos.x - 16) + "px"

			this.text.textContent = ` Turn ${ this.turn } `
		}

		updateParcels() {
			while (this.parcels.length) this.parcels.pop().remove()
			let heights = { }
			for (let { place, address } of this.worldState.parcels) {
				let height = heights[place] || (heights[place] = 0)
				heights[place] += 14
				let node = document.createElement("div")
				let offset = placeKeys.indexOf(address) * 16
				node.style.cssText = "position: absolute; height: 16px; width: 16px; background-image: url(http://eloquentjavascript.net/img/parcel2x.png); background-position: 0 -" + offset + "px";
				if (place == this.worldState.place) {
					node.style.left = "25px"
					node.style.bottom = (20 + height) + "px"
					this.robotElt.appendChild(node)
				} else {
					let pos = places[place]
					node.style.left = (pos.x - 5) + "px"
					node.style.top = (pos.y - 10 - height) + "px"
					this.node.appendChild(node)
				}
				this.parcels.push(node)
			}
		}

		tick() {
			let { direction, memory } = this.robot(this.worldState, this.robotState)
			this.worldState = this.worldState.move(direction)
			this.robotState = memory
			this.turn++
			this.updateView()
			if (this.worldState.parcels.length == 0) {
				this.button.remove()
				this.text.textContent = ` Finished after ${ this.turn } turns`
				this.robotElt.firstChild.src = "http://eloquentjavascript.net/img/robot_idle2x.png"
			} else {
				this.schedule()
			}
		}

		schedule() {
			this.timeout = setTimeout(() => this.tick(), 1000 / speed)
		}

		clicked() {
			if (this.timeout == null) {
				this.schedule()
				this.button.textContent = "Stop"
				this.robotElt.firstChild.src = "http://eloquentjavascript.net/img/robot_moving2x.gif"
			} else {
				clearTimeout(this.timeout)
				this.timeout = null
				this.button.textContent = "Start"
				this.robotElt.firstChild.src = "http://eloquentjavascript.net/img/robot_idle2x.png"
			}
		}
	}

	window.runRobotAnimation = function(worldState, robot, robotState) {
		if (active && active.timeout != null)
			clearTimeout(active.timeout)
		active = new Animation(worldState, robot, robotState)
	}
})()


const road_graph = {
	"Alice's House": ["Bob's House", 'Cabin', 'Post Office'],
	"Bob's House":   ["Alice's House", 'Town Hall'],
	"Cabin":         ["Alice's House"],
	'Post Office':   ["Alice's House", 'Marketplace'],
	'Town Hall':     ["Bob's House", "Daria's House", 'Marketplace', 'Shop'],
	"Daria's House": ["Ernie's House", 'Town Hall'],
	"Ernie's House": ["Daria's House", "Grete's House"],
	"Grete's House": ["Ernie's House", 'Farm', 'Shop'],
	"Farm":          ["Grete's House", 'Marketplace'],
	"Shop":          ["Grete's House", 'Marketplace', 'Town Hall'],
	"Marketplace":   ['Farm', 'Post Office', 'Shop', 'Town Hall']
}


function random_pick(array) {
	let choice = Math.floor(Math.random() * array.length)
	return array[choice]
}


class VillageState {
	constructor(place, parcels) {
		this.place = place
		this.parcels = parcels
	}

	move(destination) {
		if (!road_graph[this.place].includes(destination)) {
			return this // If destinations isn't available in that place, ten return the preview state
		} else {
			let parcels = this.parcels.map((p) => { // map takes care of moving the parcels
				if (p.place != this.place) return p
				else return { place: destination, address: p.address }
			}).filter((p) => p.place != p.address) // filter takes care of making the delivery
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
			} while (place == address) // To avoid creating parcels at their destinations
			parcels.push({ place, address })
		}
		return new VillageState("Post Office", parcels) // We always start at the "Post Office"
	}
}


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

runRobotAnimation(VillageState.random(), smart_robot, []);

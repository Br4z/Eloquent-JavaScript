import { level_chars, Vec } from "./02-actors.js"

export const simple_level_plan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`

/* -------------------------------------------------------------------------- */

export class Level {
	constructor(plan) {
		let rows = plan.trim().split("\n").map(l => [...l])
		this.height = rows.length
		this.width = rows[0].length
		this.start_actors = []

		this.rows = rows.map((row, y) => {
			return row.map((ch, x) => {
				let type = level_chars[ch]
				if (typeof type != "string") {
					const pos = new Vec(x, y)
					this.start_actors.push(type.create(pos, ch))
					type = "empty"
				}
				return type
			})
		})
	}
}

/* -------------------------------------------------------------------------- */

export class State {
	constructor(level, actors, status) {
		this.level = level
		this.actors = actors
		this.status = status
	}

	static start(level) {
		return new State(level, level.start_actors, "playing")
	}

	get player() {
		return this.actors.find(a => a.type == "player")
	}
}

/* -------------------------------------------------------------------------- */

export const simple_level = new Level(simple_level_plan)
// console.log(`${simple_level.width} by ${simple_level.height}`) // 22 by 9

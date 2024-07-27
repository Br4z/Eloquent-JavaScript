import request from "./01-environment.js";
import screen_addresses from "./02-network_scanning.js";


function display_frame(frame) {
	return Promise.all(frame.map((data, i) => {
		return request(screen_addresses[i], {
			command: "display",
			data
		})
	}))
}

function wait(time) {
	return new Promise(accept => setTimeout(accept, time));
}

export default class VideoPlayer {
	constructor(frames, frame_time) {
		this.frames = frames
		this.frame_time = frame_time
		this.stopped = true
	}


	async play() {
		this.stopped = false
		for (let i = 0; !this.stopped; i++) {
			let next_frame = wait(this.frame_time)
			await display_frame(this.frames[i % this.frames.length])
			await next_frame
		}
	}

	stop() {
		this.stopped = true
	}
}

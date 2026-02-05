import clip_images from "./03-clip_images.js"
import VideoPlayer from "./04-video_player.js"


let video = new VideoPlayer(clip_images, 100)

video.play().catch(e => {
	console.log("Playback failed: " + e)
})

setTimeout(() => video.stop(), 15000)

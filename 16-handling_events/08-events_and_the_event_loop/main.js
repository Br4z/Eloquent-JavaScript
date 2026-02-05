let square_worker = new Worker("worker.js")
square_worker.addEventListener("message", event => {
	console.log("The worker responded:", event.data)
})

square_worker.postMessage(10)
square_worker.postMessage(24)

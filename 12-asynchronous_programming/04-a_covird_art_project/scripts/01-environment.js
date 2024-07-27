const request = function() {
	class Screens {
		constructor() {
			this.get_parent()
			let doc = this.parent.ownerDocument
			this.dom = this.parent.appendChild(doc.createElement("div"))
			this.dom.style.cssText = "position: relative; max-width: 500px"
			let inner = this.dom.appendChild(doc.createElement("div"))
			inner.style.cssText = "position: relative; width: 100%; padding-bottom: 60%"
			this.screens = []
			for (let i = 0; i < 9; i++) {
				let screen = inner.appendChild(doc.createElement("div"))
				let row = Math.floor(i / 3), col = i % 3
				screen.style.cssText = "border: 1px solid #222; background: black; position: absolute; width: 33.3%; height: 33.3%; left: " + (col * 33.3) + "%; top: " + (row * 33.3) + "%"
				let canvas = screen.appendChild(doc.createElement("canvas"))
				canvas.style.cssText = "width: 100%; height: 100%"
				this.screens.push(canvas)
			}
			this.screens.forEach(c => { c.width = c.offsetWidth; c.height = c.offsetHeight })
		}

		get_parent() {
			this.parent = window.__sandbox ? window.__sandbox.output.div : document.body
		}

		update(n, data) {
			this.get_parent()
			if (!this.parent.ownerDocument.body.contains(this.dom)) this.parent.appendChild(this.dom)

			let canvas = this.screens[n], cx = canvas.getContext("2d")
			cx.clearRect(0, 0, canvas.width, canvas.height)
			let gapX = (canvas.width * 0.4) / 51, sizeX = (canvas.width * 0.6) / 50, skipX = gapX + sizeX
			let gapY = (canvas.height * 0.4) / 31, sizeY = (canvas.height * 0.6) / 30, skipY = gapY + sizeY
			for (let i = 0, col = 0, row = 0; i < 1500; i++) {
				let pixel = data[i]
				if (pixel) {
					cx.fillStyle = pixel == 3 ? "#fd4" : pixel == 2 ? "#a82" : "#741"
					cx.fillRect(gapX + col * skipX, gapY + row * skipY, sizeX, sizeY)
				}
				if (col == 49) {
					col = 0
					row++
				}  else
					col++
			}
		}
	}

	let screens = null

	function screen(n) {
		return (req, resolve, reject) => {
			if (!req || req.command !== "display")
				reject(new Error("LedTec SIG-5030: INVALID REQUEST " + req?.type))
			else if (!Array.isArray(req.data) || req.data.length !== 1500)
				reject(new Error("LedTec SIG-5030: INVALID DISPLAY DATA"))
			else {
				if (!screens) {
					if (typeof window != "object" || !window.document)
						return
					screens = new Screens()
				}
				setTimeout(() => {
					screens.update(n, req.data)
					resolve({ status: "ok" })
				}, 3 + Math.floor(Math.random() * 20))
			}
		}
	}

	function error(device) {
		return (req, resolve, reject) => reject(new Error(device + ": malformed request"))
	}

	let hosts = {
		"10.0.0.1": error("ROUTER772"),
		"10.0.0.2": () => { },
		"10.0.0.4": () => { },
		"10.0.0.20": error("Puxel 7"),
		"10.0.0.33": error("jPhone[K]"),
	}

	;[
		"10.0.0.44", "10.0.0.45", "10.0.0.41",
		"10.0.0.31", "10.0.0.40", "10.0.0.42",
		"10.0.0.48", "10.0.0.47", "10.0.0.46"
	].forEach((addr, i) => hosts[addr] = screen(i))

	return function request(address, content) {
		return new Promise((resolve, reject) => {
			let host = hosts[address]
			if (!host)
				reject(new Error("No route to host " + address))
			else
				host(JSON.parse(JSON.stringify(content)), resolve, reject)
		})
	}
}()


export default request

export function join_wifi(network_ID, code) {
	return new Promise((accept, reject) => {
		let correct = "555555"
		setTimeout(() => {
			if (network_ID != "HANGAR 2")
				return reject(new Error("Network not found"))
			else if (code == correct)
				return accept(null)
			else if (!correct.startsWith(code))
				return reject(new Error("Invalid passcode"))
		}, 20)
	})
}

export function with_timeout(promise, time) {
	return new Promise((resolve, reject) => {
		promise.then(resolve, reject)
		setTimeout(() => reject("Timed out"), time)
	})
}

function crack_passcode(network_ID) {
	function next_digit(code, digit) {
		let new_code = code + digit
		return with_timeout(join_wifi(network_ID, new_code), 50)
			.then(() => new_code)
			.catch(failure => {
				if (failure == "Timed out")
					return next_digit(new_code, 0)
				else if (digit < 9)
					return next_digit(code, digit + 1)
				else
					throw failure
			})
	}
	return next_digit("", 0)
}

/* ---------------------------------- TEST ---------------------------------- */

// crack_passcode("HANGAR 2").then(console.log) // 555555

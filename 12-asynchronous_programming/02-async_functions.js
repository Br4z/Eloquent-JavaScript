import { join_wifi, with_timeout } from "./01-breaking_in.js"


async function crack_passcode(network_ID) {
	for (let code = ""; ;) {
		for (let digit = 0; ; digit++) {
			let new_code = code + digit
			try {
				await with_timeout(join_wifi(network_ID, new_code), 50)
				return new_code
			} catch (failure) {
				if (failure == "Timed out") {
					code = new_code
					break
				} else if (digit == 9)
					throw failure
			}
		}
	}
}

/* ---------------------------------- TEST ---------------------------------- */

crack_passcode("HANGAR 2").then(console.log) // 555555

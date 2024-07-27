function promise_all(promises) {
	return new Promise((resolve, reject) => {
		let results = []
		let pending_promises = promises.length

		for (let i = 0; i < promises.length; i++) {
			promises[i].then(result => {
				results[i] = result
				pending_promises--

				if (pending_promises == 0)
					resolve(results)
			}).catch(reject)
		}

		if (pending_promises == 0)
			resolve(results)
	})
}

/* ---------------------------------- TEST ---------------------------------- */

promise_all([]).then(array => {
	console.log("This should be []:", array)
})

function soon(val) {
	return new Promise(resolve => {
		setTimeout(() => resolve(val), Math.random() * 500)
	})
}

promise_all([soon(1), soon(2), soon(3)]).then(array => {
	console.log("This should be [1, 2, 3]:", array)
})

promise_all([soon(1), Promise.reject("X"), soon(3)])
	.then(array => {
		console.log("We should not get here")
	})
	.catch(error => {
		if (error != "X")
			console.log("Unexpected failure:", error)
	})

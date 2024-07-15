const accounts = {
	a: 100,
	b: 0,
	c: 20
}

function get_account() {
	let account_name = "a" // prompt("Enter an account name")

	if (!accounts.hasOwnProperty(account_name))
		throw new Error(`No such account: ${account_name}`)

	return account_name
}

function transfer(from, amount) {
	if (accounts[from] < amount)
		return

	let progress = 0

	try {
		accounts[from] -= amount
		progress = 1
		accounts[get_account()] += amount
		progress = 2
	} finally {
		if (progress == 1)
			accounts[from] += amount
	}
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(transfer(a, 20))
console.log(accounts)

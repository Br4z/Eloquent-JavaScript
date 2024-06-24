export default function random_pick(array) {
	let choice = Math.floor(Math.random() * array.length)
	return array[choice]
}

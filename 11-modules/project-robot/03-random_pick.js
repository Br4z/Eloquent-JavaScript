export default function random_pick(array) {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

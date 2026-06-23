function* powers(n) {
  for (let current = n; ; current *= n) yield current;
}

/* ---------------------------------- TEST ---------------------------------- */

for (let power of powers(3)) {
  if (power > 50) break;
  console.log(power);
}

function* chat_bot() {
  const first_reply = yield 'Hello! What is your name?';
  console.log(`User's name is ${first_reply}.`);

  const second_reply = yield `Nice to meet you, ${first_reply}! How old are you?`;
  console.log(`User is ${second_reply} years old.`);

  return 'Chat ended.';
}

const bot = chat_bot();

// Start the conversation
console.log(bot.next().value); // "Hello! What is your name?"

// Send a value back into the generator
console.log(bot.next('Alice').value); // "Nice to meet you, Alice! How old are you?"

// Send the final value
console.log(bot.next(30).value); // "Chat ended."

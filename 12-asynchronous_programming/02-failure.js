import read_text_file from './01-promises.js';

function text_file(filename) {
  return new Promise((resolve, reject) => {
    read_text_file(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}

/* ---------------------------------- TEST ---------------------------------- */

text_file('ls.txt')
  .then((value) => console.log('Handler 1:', value))
  .catch((reason) => {
    console.log('Caught failure ' + reason);
    return 'nothing';
  })
  .then((value) => console.log('Handler 2:', value));

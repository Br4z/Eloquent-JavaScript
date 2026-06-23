export default function read_text_file(filename, callback) {
  const mock_data = {
    'ls.txt': 'example.txt\ndata.txt',
    'example.txt': 'This is an example file content.',
    'data.txt': 'Sample data for testing.',
  };

  const should_fail = Math.random() > 0.5;

  if (should_fail)
    setTimeout(() => {
      callback(null, new Error(`Failed to read ${filename}`));
    }, 100);
  else
    setTimeout(() => {
      callback(mock_data[filename] || 'File not found.', null);
    }, 100);
}

function text_file(filename) {
  return new Promise((resolve) => {
    read_text_file(filename, (text) => resolve(text));
  });
}

function random_file_v1(list_file) {
  return text_file(list_file)
    .then((content) => content.trim().split('\n'))
    .then((ls) => ls[Math.floor(Math.random() * ls.length)])
    .then((filename) => text_file(filename));
}

function random_file_v2(list_file) {
  return text_file(list_file).then((content) => {
    const ls = content.trim().split('\n');
    const random_file = ls[Math.floor(Math.random() * ls.length)];
    return text_file(random_file);
  });
}

async function random_file_v3(list_file) {
  let ls = await text_file(list_file);
  ls = ls.trim().split('\n');
  const random_file = ls[Math.floor(Math.random() * ls.length)];

  return text_file(random_file);
}

/* ---------------------------------- TESTS --------------------------------- */

// random_file_v1("ls.txt")
//  .then(console.log)

// random_file_v2("ls.txt")
//  .then(console.log)

// random_file_v3("ls.txt")
//  .then(console.log)

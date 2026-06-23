function strip_comments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}

/* ---------------------------------- TEST ---------------------------------- */

console.log(strip_comments('1 /* a */+/* b */ 1')); //  1 + 1

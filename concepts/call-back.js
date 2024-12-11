function add(x, y, cb) {
  const sum = x + y;
  cb(sum);
}

function logResult(result) {
  console.log(result);
}

add(10, 5, logResult);

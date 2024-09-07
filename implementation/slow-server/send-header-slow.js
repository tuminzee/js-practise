import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Length", 10);

  setTimeout(() => {
    res.write("123456789");
    setTimeout(() => {
      res.write("0");
      res.end();
    }, 2000);
  }, 3000);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

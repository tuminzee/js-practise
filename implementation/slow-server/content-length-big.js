import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Length", 11);

  res.write("123456789");

  setTimeout(() => {
    res.write("0");
    res.end();
  }, 2000);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// The content length is specified to be 11 bytes, but the server only sends 9 bytes before introducing a 2-second delay. Later it will write another byte and end the response. Content length is mismatched with the actual content length, which can cause the client to wait for the remaining bytes that will never arrive. This can lead to a "failed net::ERR_CONTENT_LENGTH_MISMATCH"

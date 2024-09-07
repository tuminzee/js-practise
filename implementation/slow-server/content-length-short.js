import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Length", 9);

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

// The content length is specified to be 9 bytes, server writes the first 9 bytes, but then introduces a 2-second delay before writing the remaining byte and ending the response. The client won't wait for the remaining byte because the content length has already been reached. So only the first 9 bytes will be displayed in the browser.
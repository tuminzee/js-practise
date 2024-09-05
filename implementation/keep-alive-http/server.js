const http = require('http');

const log = console.log;
console.log = (...args) => {
  log.apply(console, [new Date().toISOString()].concat(args));
};

const port = process.argv[2];
const server = http.createServer((req, res) => {
  console.log('Incoming request');

  setTimeout(() => {
    res.end('Success');
  }, 1000);

  res.on('finish', () => {
    console.log('Response is sent');
  });
});

// node v8.7.0
// - default == 5 sec
// - 0       == forever, but will be terminated by idle timeout 120 sec
// - N       == N ms
if (process.argv[3] != void 0) {
  server.keepAliveTimeout = +process.argv[3];
}

if (process.argv[4] != void 0) {
  server.timeout = +process.argv[4];
}

server.listen(port, (err) => {
  if (err) {
    console.error('Failed to start HTTP server', err);
  } else {
    console.log('Listening on port ' + port + '...');
  }
});

server.addListener('connection', (socket) => {
  const uniqId = Date.now() + '-' + Math.floor(Math.random() * 1e6);
  console.log('New connection', uniqId);
  socket.on('close', () => {
    console.log('Connection closed', uniqId);
  });
});

server.addListener('timeout', (socket) => {
  console.log('Socket timeout out', socket);
});


// Run server:
// $ node keep-me-alive.js 8081 75000  # closes connections after 75 seconds of inactivity (after finishing the initial HTTP req)
// $ node keep-me-alive.js 8081 0 0    # will be keeping connections forever

// Test with:
// $ echo -e "GET / HTTP/1.1\n\n\n" | netcat localhost 8081 
// $ echo -e "GET / HTTP/1.1\nConnection: keep-alive\n\n" | netcat localhost 8081
// $ echo -e "GET / HTTP/1.1\nConnection: close\n\n" | netcat localhost 8081
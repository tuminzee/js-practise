const http = require('http');

const server2 = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Server 2 on port 3002');
});

server2.listen(3002, () => {
    console.log('Server 2 running on port 3002');
});

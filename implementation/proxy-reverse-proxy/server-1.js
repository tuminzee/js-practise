const http = require('http');

const server1 = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Server 1 on port 3001');
});

server1.listen(3001, () => {
    console.log('Server 1 running on port 3001');
});

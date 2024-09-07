const http = require('http');

const server = http.createServer((req, res) => {
    // Log incoming request
    console.log('Incoming request:', {
        method: req.method,
        url: req.url,
        headers: req.headers
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the actual server!');

    // Log outgoing response
    console.log('Outgoing response:', {
        statusCode: res.statusCode,
        headers: res.getHeader('Content-Type')
    });
});

server.listen(3000, () => {
    console.log('Actual server listening on port 3000');
});
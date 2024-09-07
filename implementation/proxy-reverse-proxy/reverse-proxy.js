const http = require('http');

// List of backend servers
const backends = [
    { hostname: 'localhost', port: 3001 },
    { hostname: 'localhost', port: 3002 }
];

// Variable to keep track of which backend server to use
let currentBackendIndex = 0;

// Create the reverse proxy server
const reverseProxy = http.createServer((req, res) => {
    // Get the current backend server
    const backend = backends[currentBackendIndex];

    // Increment the index for the next request (round-robin)
    currentBackendIndex = (currentBackendIndex + 1) % backends.length;

    // Define options for forwarding the request to the selected backend server
    const options = {
        hostname: backend.hostname,
        port: backend.port,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    // Forward the request to the selected backend server
    const proxyRequest = http.request(options, (backendResponse) => {
        // Forward the status code and headers from the backend server to the client
        res.writeHead(backendResponse.statusCode, backendResponse.headers);

        // Pipe the response from the backend server back to the client
        backendResponse.pipe(res);
    });

    // Handle any errors
    proxyRequest.on('error', (err) => {
        console.error('Error with the proxy request:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
    });

    // Pipe the request body from the client to the backend server
    req.pipe(proxyRequest);
});

// Listen on port 8080 for incoming requests
reverseProxy.listen(8080, () => {
    console.log('Reverse Proxy running on port 8080 with round-robin load balancing');
});

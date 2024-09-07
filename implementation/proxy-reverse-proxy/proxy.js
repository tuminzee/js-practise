// proxy.js
const http = require('http');

// Create the proxy server on port 8080
const proxy = http.createServer((req, res) => {
    // Define options to forward the request to the actual server (localhost:3000)
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: req.url,
        method: req.method,
        // headers: req.headers
    };

    // Forward the request to the actual server
    const proxyRequest = http.request(options, (serverResponse) => {
        // Write the status code and headers from the actual server
        res.writeHead(serverResponse.statusCode, serverResponse.headers);
        
        // Pipe the response from the actual server back to the client
        serverResponse.pipe(res);
    });

    // Handle any errors
    proxyRequest.on('error', (err) => {
        console.error('Error with the proxy request:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
    });

    // Pipe the request data from the client to the actual server
    req.pipe(proxyRequest);
});

proxy.listen(8080, () => {
    console.log('Proxy server running on port 8080');
});

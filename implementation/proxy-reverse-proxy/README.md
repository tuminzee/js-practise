### Proxy

Proxy is a server that makes the request on your behalf.
If I want to go to google.com, and if I use a proxy.
Proxy will make the request on my behalf and get the response from google.com

First a layer 4 conn will be established with the proxy server
meannig that a TCP connection will be established between the client and the proxy server.
Later the proxy server will make a TCP connection with the google server and get the response and send it back to the client.

Client -> Proxy -> Server

it could have variety of layer 4(TCP) or layer 7(HTTP) proxies, etc.

Proxy Use Case
- Caching
- Logging
- Block sites
- Microservices
- Anonymity

https://www.telerik.com/fiddler
https://www.charlesproxy.com/


### Reverse Proxy

Reverse proxy is a layer 7 application that makes the request on the server's behalf.

Reverse Proxy is a server that makes the request on the server's behalf

Client will establish a TCP connection with the reverse proxy server.
Reverse Proxy will know the IP address of the actual server, and it will also know the IP of the client.
Reverse Proxy will make a TCP connection with the actual server and get the response and send it back to the client.

In reverse proxy, the client doesn't know the actual server, it only talks to the reverse proxy

Client -> (Server / Reverse Proxy) -> Actual Server

Reverse Proxy Use Case
- Load Balancing
- SSL Termination
- Caching (CDN)
- Compression
- Static Content

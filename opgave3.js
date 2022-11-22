// Opgave 3 - Express app med load balancer og TLS/SSL socket

// dependencies
// npm install http-proxy express
const http = require('http')
const https = require('https')
const httpProxy = require('http-proxy')
const fs = require('fs')
const express = require('express')
const httpServer = express()
const app = express()

// create a http proxy
const proxy = httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 8000
  },
  ssl: {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  },
  secure: false
}).listen(8080, () => {
  console.log('HTTP proxy server listening on port 8080')
})

// redirect http to https
httpServer.get('*', (req, res, next) => {
  if (!req.secure) {
      res.redirect('https://' + req.hostname + ':' + balancer.address().port + req.path)
  }
  next()
})

// create HTTP and HTTPS server
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

const redirectServer = http.createServer(httpServer).listen(4000, () => {
  console.log('Express HTTP server listening on port %d', redirectServer.address().port)
})

const server1 = https.createServer(options, app).listen(3000, () => {
  console.log('Express HTTPS server listening on port %d', server1.address().port)
})

const server2 = https.createServer(options, app).listen(3001, () => {
  console.log('Express HTTPS server listening on port %d', server2.address().port)
})

const server3 = https.createServer(options, app).listen(3002, () => {
  console.log('Express HTTPS server listening on port %d', server3.address().port)
}) 

// array with servers
var addresses = [
  {
    host: 'localhost',
    port: server1.address().port,
    protocol: 'https'
  },
  {
    host: 'localhost',
    port: server2.address().port,
    protocol: 'https'
  },
  {
    host: 'localhost',
    port: server3.address().port,
    protocol: 'https'
  }
]

// round robin load balancer
const balancer = https.createServer(options, (req, res) => {
  var target = { target: addresses.shift() }
  console.log('Load balancing request to:', target)
  proxy.web(req, res, { target: target['target']['protocol'] + '://' + target['target']['host'] + ':' + target['target']['port'], changeOrigin: true},  function(e) { console.log(e) })
  addresses.push(target.target)
}).listen(8000, () => {
  console.log('Load balancer running at port %d', balancer.address().port)
})

// Express route
app.get("/", (req, res) => {
  res.send("Hello World!")
})

// go to localhost port 4000 and see redirect to https
// http://localhost:4000

// curl request with parameter to ignore unsafe certificate
// curl --insecure https://localhost:8000

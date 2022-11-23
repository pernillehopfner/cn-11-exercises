// Opgave 1 - Cluster API og Express app med pm2

// Lav et Node.js projekt og installer dependencies
// npm init -y
// npm install express

// Installer Process Manager 2 globalt
// npm install -g pm2
// Link: https://www.npmjs.com/package/pm2

// Opgave 2 - start applikationen med pm2

// Link: https://pm2.keymetrics.io/docs/usage/quick-start/
// Skift app.js ud med navnet på din Node applikation

// pm2 start app.js
// pm2 list
// pm2 stop app
// pm2 delete app

// Start pm2 med cluster i stedet for fork
// cluster siger til pm2 det skal anvende Node.js cluster module til at eksekvere koden
// pm2 start app.js -i max -f
// pm2 stop all
// pm2 delete all

// Node.js core module Cluster 
// Link: https://nodejs.org/api/cluster.html

const cluster = require('cluster')
const http = require('http')
const os = require('os')
const process = require('process')
const express = require("express");
const port = 3000;

// se antallet af CPU cores (på MacOS...)
// sysctl -n hw.ncpu
// or console.log(numCPUs)

const numCPUs = os.cpus().length;

// Clusters of Node.js processes can be used to run multiple instances of Node.js 
// that can distribute workloads among their application threads

// The cluster module allows easy creation of child processes that all share server ports
if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${numCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  const app = express();
  console.log(`Worker ${process.pid} started`);
 
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
 
  // API request with route parameter
  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    // Opgave 1 - lav en counter ud fra route parameter 'n' som udregner et tal 'count'
 
    res.send(`Final count is ${count}`);
  });

  // listen on port
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

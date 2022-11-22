// Opgave 5 - loadtest, response time og express-console-logger

// Kør Node.js applikationen for opgave 1 i en Command-Line Interface (cmd på Windows / Terminal på MacOS)
// Åben en ny CLI til loadtest og åben en ny CLI til curl

// npm install -g loadtest
// Link: https://www.npmjs.com/package/loadtest
// loadtest http://localhost:3000/api/500000 -n 1000 -c 100
// loadtest http://localhost:3000/api/500000000 -n 1000 -c 100

// npm install response-time
// Link: https://www.npmjs.com/package/response-time

// Indsæt modulet response-time i projektet
// giver header med response time i HTTP response

// var responseTime = require('response-time')
// var app = express()
// app.use(responseTime())

// npm install express-console-logger
// Link: https://www.npmjs.com/package/express-console-logger

// Indsæt modulet express-console-logger i projektet

// const { status_xxx } = require('express-console-logger')
// app = express()

// app.get('/', (req, res) => {
//    res.send('GET')
//    status_xxx(req, res)
// });

// Lav curl request op imod Node.js applikationen i opgave 1
// Link: https://curl.se/docs/manual.html
// Udregningen af tallet påvirker responstiden

// curl -v http://localhost:3000/api/5000000000
// curl -i http://localhost:3000/api/5000000000

// counter til opgave 1

    // if (n > 5000000000) n = 5000000000;
 
    // for (let i = 0; i <= n; i++) {
    //   count += i;
    // }

// Middleware for HTTP metoder
// Andre interessante npm moduler cors, morgan og helmet
// Link: https://www.npmjs.com/package/cors 
// Link: https://www.npmjs.com/package/morgan
// Link: https://www.npmjs.com/package/helmet

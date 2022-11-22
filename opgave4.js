// Opgave 4 - Sessions og memcache

// MacOS guide i Terminal for at starte memcached med 100 MB memory på port 11211
// ps -few | grep memcached
// /usr/local/opt/memcached/bin/memcached -m 100 -p 11211 -u daemon

// npm init -y
// npm install connect-memcached express-session

// Link: https://www.npmjs.com/package/connect-memcached
// Link: https://www.npmjs.com/package/express-session

// Start applikationen og åben http://localhost:9341/
// Luk applikationen, start den igen og åben http://localhost:9341/
// Åben http://localhost:9341/ i flere vinduer og opdater de forskellige vinduer
// "Viewed XX times."

const express = require("express")
const session = require("express-session")
const app = express()
const MemcachedStore = require("connect-memcached")(session)

app.use(
  session({
    secret: "CatOnKeyboard",
    key: "test",
    proxy: "true",
    resave: false,
    saveUninitialized: false,
    store: new MemcachedStore({
      hosts: ["127.0.0.1:11211"],
      secret: "123, easy as ABC. ABC, easy as 123"
    })
  })
)

app.get("/", function(req, res) {
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
  }
  res.send("Viewed <strong>" + req.session.views + "</strong> times.");
})

app.listen(9341, function() {
  console.log("Listening on port %d", this.address().port);
})

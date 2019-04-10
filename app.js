// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  if (req.params.date_string === undefined) {
    const date = new Date()
    return res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }

  const ts = Number(req.params.date_string)

  if (ts) {
    const date = new Date(ts)
    return res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }
  
  const date = new Date(req.params.date_string)
  
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date'})
  }

  return res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

module.exports = app;

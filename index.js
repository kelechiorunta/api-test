// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date", function (req, res) {
  let timestamp = req.params.date;

  // Check if the input is a valid Unix timestamp or a date string
  if (!isNaN(timestamp)) {
    // If it's a number, parse it as an integer (assuming it's in milliseconds)
    timestamp = parseInt(timestamp);
  }

  // Create a Date object from the timestamp or date string
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Format as required
  const unixTimestamp = date.getTime();
  const utcString = date.toUTCString();

  // Respond with the formatted date
  res.json({ unix: unixTimestamp, utc: utcString });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

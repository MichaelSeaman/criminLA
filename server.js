const express = require('express');
const fs = require('fs');
const sqlMethods = require('./js/sqlMethods.js');
const path = require('path');
const port = parseInt(process.argv[2] || "3000");

var app = express();
var shuttingDown = false;



//Serves all the files in the /public folder blindly
app.use(express.static('public'));

app.get('/recordsByArea', function (req, res) {
  console.log(req);
  var posLat = req.query.posLat;
  var posLong = req.query.posLong;
  var radius = req.query.radius;
  var procedureString = `getLocalTimeData(${posLat}, ${posLong}, ${radius})`;
  sqlMethods.executeStoredProcedure(procedureString, function (data, err) {
    res.end("" + JSON.stringify(arguments));
  });
});

//Stops requests in progress in case of shutdown
app.use(function (req, res, next) {
  if(!shuttingDown) {
    return next();
  }

  res.setHeader('Connection', 'close');
  res.send(503, "Server restart");
});


//Server startup
var server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

//Closing gracefully
process.on('SIGINT', terminateGracefully);
process.on('SIGTERM', terminateGracefully);

function terminateGracefully() {
  shuttingDown = true;
  console.log("\nClosing Server.");
  server.close(function () {
    console.log("\nClosing MySQL Connection.");
    sqlMethods.endPool();
    console.log("Closed.");
    process.exit(0);
  });

  setTimeout(function () {
    console.error("\nForcing shutdown");
    process.exit(1);
  }, 5*1000);

}

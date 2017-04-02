const express = require('express');
const fs = require('fs');
const sqlMethods = require('./js/sqlMethods.js');
const path = require('path');
const port = parseInt(process.argv[2] || "3000");

var sqlTableData = JSON.parse(fs.readFileSync('tableData.json', 'utf-8')).tables;
var app = express();
var shuttingDown = false;



//Serves all the files in the /public folder blindly
app.use(express.static('public'));

//Handling post requests
app.use(bodyParser.urlencoded({ "extended": false}));
app.use(bodyParser.json());

app.post("/display", function (req, res) {
  var tableName = req.body.tableName;
  sqlMethods.displayTable(tableName, function (data, extraData, err) {
    res.end("" + JSON.stringify(arguments));
  });
  console.log(`Recieved display request for ${tableName}`);
});

app.post("/search", function (req, res) {
  var tableName = req.body.tableName;
  var colName = req.body.colName;
  var input = req.body.input;
  sqlMethods.searchTableByColumn(tableName, colName, input, function (data, extraData, err) {
    res.end("" + JSON.stringify(arguments));
  });
  console.log(`Recieved search request for ${tableName}`);
});

app.post("/create", function (req, res) {
  var tableName = req.body.tableName;
  var userInputs = req.body['userInputs[]'];
  var validInsertColumnNames = req.body['validInsertColumnNames[]'];
  sqlMethods.insertValuesToTable(userInputs, validInsertColumnNames, tableName, null, function (data, extraData, err) {
    res.end("" + JSON.stringify(arguments));
  });
  console.log(`Recieved create request for ${tableName}`);
});

app.post("/update", function (req, res) {
  var tableName = req.body.tableName;
  var userInputs = req.body['userInputs[]'];
  var colNames = req.body['colNames[]'];
  var id = req.body.id;
  var idColName = req.body.idColName;

  if(!Array.isArray(userInputs)) {
    userInputs = [userInputs];
  }
  if(!Array.isArray(colNames)) {
    colNames = [colNames];
  }

  sqlMethods.updateRowWithID(id, idColName, userInputs, colNames, tableName, function (data, extraData, err) {
    res.end("" + JSON.stringify(arguments));
  });
  console.log(`Recieved update request for ${tableName}`);
});

app.post("/delete", function (req, res) {
  var tableName = req.body.tableName;
  var id = req.body.id;
  var idColName = req.body.idColName;
  var value = 1;
  var colName = "deleted";

  sqlMethods.updateRowWithID(id, idColName, [value], [colName], tableName, function (data, extraData, err) {
    res.end("" + JSON.stringify(arguments));
  });
  console.log(`Recieved delete request for ${tableName}`);
});

//Generating reports
app.get(/\/downloads\/*/, function (req, res) {

  var filename = path.basename(req.originalUrl);
  var temp = filename.split(".");
  var procedure = temp[temp.length - 2];

  sqlMethods.executeStoredProcedure(`get${procedure}()`, function (data, extraData, err) {
    if (err) {
      console.log(err);
      return;
    }
    var csvData = data[0];
    var fields = Object.keys(csvData[0]);
    var csv = json2csv({
      "data" : csvData,
      "fields"  : fields
    });
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
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

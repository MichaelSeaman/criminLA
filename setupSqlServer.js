const sqlMethods = require('./js/sqlMethods.js');
const fs = require('fs');
const DATA_2015_FILE = 'data/Open_Data_ARR_2015.csv';
const DATA_2016_FILE = 'data/Open_Data_ARR_2016.csv';
const dateformat = require('dateformat');

var dbSetupScript = fs.readFileSync('sql/db_setup.sql', 'utf-8');
var sqlCommands = dbSetupScript.split(";");
for (var i = 0; i < sqlCommands.length; i++) {
  sqlCommands[i] = sqlCommands[i].replace(/[\r\n]/g,"");
  sqlCommands[i] += ";";
  if(sqlCommands[i] != ";") {
    sqlMethods.executeQuery(sqlCommands[i], console.log);
  }
  sqlMethods.selectStar('crime');
}

function insertRow(row) {
  console.log(row);
  var entries = row.split(',');
  var dateString = entries[0].split(' ')[0];
  var timestring = entries[1];
  var date = null;
  if(dateString != "" && timestring != "" ) {
    var d = new Date(dateString + ' ' + timestringToTime(timestring));
    date = d.toISOString().substring(0, 19).replace('T', ' ');

  }
  var latitude = null;
  var longitude = null;
  if(entries[16] && entries[17]){
    var latString = entries[16].replace('"','').replace('(','').replace(' ', '');
    var longString = entries[17].replace('"','').replace(')','').replace(' ', '');
    latitude = parseFloat(latString);
    longitude = parseFloat(longString);
    if(latitude == NaN || longitude == NaN) {
      latitude = null;
      longitude = null;
    }
  }

  var rpt_id = parseInt(entries[2])
  var area = entries[3]
  var area_desc = entries[3]
  var age = parseInt(entries[6]);
  var sex = entries[7];
  var charge = entries[12];
  var charge_desc = entries[13];
  var values = [rpt_id, date, area, area_desc, age, sex, charge, charge_desc, longitude, latitude];
  var colNames = ['rpt_id', 'arst_date', 'area' , 'area_desc', 'age' , 'sex', 'charge', 'charge_desc', 'latitude', 'longitude'];
  var tableName = 'crime';
  sqlMethods.insertValuesToTable(values, colNames, tableName);

}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function timestringToTime(timestring) {
  //Takes a string in the format HHMM and converts it to HH:MM
  var d = new Date(parseInt(timestring) * 60000);
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  return (h + ":" + m + ":" + s);
}

textData2015 = fs.readFileSync(DATA_2015_FILE).toString().split('\n');
textData2015.shift()
textData2015.forEach(insertRow);

textData2016 = fs.readFileSync(DATA_2016_FILE).toString().split('\n');
textData2016.shift()
textData2016.forEach(insertRow);


//Closing gracefully
process.on('SIGINT', terminateGracefully);
process.on('SIGTERM', terminateGracefully);

function terminateGracefully() {
  console.log("\nClosing MySQL Connection.");
  sqlMethods.endPool();
  console.log("Closed.");
  process.exit(0);


  setTimeout(function () {
    console.error("\nForcing shutdown");
    process.exit(1);
  }, 5*1000);

}

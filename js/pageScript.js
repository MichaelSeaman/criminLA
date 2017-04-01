//Page script here
var data = [];
const DATA_URL_2015 = "https://data.lacity.org/resource/4yt4-9aq2.json";
const DATA_URL_2016 = "https://data.lacity.org/resource/b6pd-28qb.json";

loadCrimeData(DATA_URL_2015, data, updateMap);
loadCrimeData(DATA_URL_2016, data, updateMap);

function updateMap() {

  var long_lat = getLocationsFromData(data);
  // long_lat is a 2d array as such: [long, lat]

  //Do the map updating here
  console.log(long_lat);
}

function getLocationsFromData(data){
  //Takes full dataset and returns 2 arrays - long and lat
  //with 0,0s filtered out
  console.log("Locations called");
  longs = [];
  lats = [];
  for (var i = 0; i < data.length; i++) {
    long = data[i].location_1.coordinates[0]
    lat = data[i].location_1.coordinates[1]
    if(!(long == 0 && lat == 0)) {
      longs.push(long);
      lats.push(lat);
    }

  }
  return [longs, lats];
}

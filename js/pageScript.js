//Page script here
var data = [];
const DATA_URL_2015 = "https://data.lacity.org/resource/4yt4-9aq2.json";
const DATA_URL_2016 = "https://data.lacity.org/resource/b6pd-28qb.json";

loadCrimeData(DATA_URL_2015, data, console.log);
loadCrimeData(DATA_URL_2016, data, console.log);

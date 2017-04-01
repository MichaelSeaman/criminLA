//Loading LAPD Data

const LA_CITY_APP_TOKEN = "srn1Ftlq8QD1miN3hWbVXrDzX";

// url = "https://data.lacity.org/resource/4yt4-9aq2.json"
function loadCrimeData(url, dataObject, onCompletion) {
  //sends an ajax request to the url and
  //populates dataObject with the rows it recieves
  //Then it calls onCompletion(row)
  $.ajax({
    url: url,
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : LA_CITY_APP_TOKEN
    }
  }).done(function (data) {
    saveDataChunk(data, dataObject, onCompletion);
  });
}

function saveDataChunk(dataChunk, dataObject, onCompletion) {
  dataChunk.forEach(function (row) {
    dataObject.push(row);
    onCompletion(row);
  });
}

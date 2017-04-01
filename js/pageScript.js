

//Loading LAPD Data

$.ajax({
  url: "https://data.lacity.org/resource/4yt4-9aq2.json",
  type: "GET",
  data: {
    "$limit" : 5000,
    "$$app_token" : "srn1Ftlq8QD1miN3hWbVXrDzX"
  }
}).done(function(data) {
alert("Retrieved " + data.length + " records from the dataset!");
console.log(data);
});

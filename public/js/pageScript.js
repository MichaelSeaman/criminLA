//Page script here

function getRecordsInArea(placeObject, radius) {
  console.log(placeObject);
  geocoder = new google.maps.Geocoder();
  console.log(placeObject.id);
  geocoder.geocode( { 'placeId' : placeObject.id }, function( results, status ) {
        console.log("geocode back");
        if( status == google.maps.GeocoderStatus.OK ) {
            var posLat = results[0].geometry.location.lat();
            var posLong = results[0].geometry.location.lng();
            console.log(results[0].geometry.location);
            $.post("/recordsByArea", {
                  "posLat": posLat,
                  "posLong": posLong,
                  "radius": radius
                }, function (data, err) {
                  console.log(data);
                  //makeGraph(data)
                  hideIntro();
                  updateGraph();
                });

        } else {
            console.log( 'Geocode was not successful for the following reason: ' + status );
        }
    } );
  var posLat;
  var posLong;

}

function hideIntro() {
  var intro = $("#intro");
  intro.empty();
  intro.html('<div class="col-xs-12">    <div id="chartHere" class="col-xs-8">       </div>    <div class="col-xs-4">      <p>        Hey      </p>      <p>        Yo      </p>    </div>  </div>');
  $("#chartHere").append('<canvas id ="lineChart"></canvas>');
  tempGrapher();
}

function updateGraph() {
  var graph = document.getElementById('lineChartContainer')
    graph.style.display = 'block';
}

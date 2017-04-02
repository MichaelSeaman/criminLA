//Page script here

function getRecordsInArea(lat, long, radius) {
  var totalData = [];

  $.get("/recordsByArea", {"posLat": lat, "posLong": long, "radius": radius}, function (datarow, err) {
    data = JSON.parse(datarow);
    console.log(JSON.stringify(data[0][0]));
    hideIntro();
    makeGraph(data[0][0])
    updateGraph();
      });
}


function hideIntro() {
  var intro = $("#intro");
  intro.empty();
  intro.html('<div class="row" style="padding-bottom: 15px" style="margin:0 auto"> <div class="col-xs-12" > <div id="chartHere" class="col-xs-8"> </div> <div class="col-xs-4"> </div>  </div> </div>');
  $("#chartHere").append('<canvas id ="lineChart" ></canvas>');
}


function updateGraph() {
    var graph = document.getElementById("lineChart")
    console.log(graph)
    graph.style.display = 'block';
}

//Page script here

function getRecordsInArea(lat, long, radius) {
  $.post("/recordsByArea", {
        "posLat": lat,
        "posLong": long,
        "radius": radius
      }, function (data, err) {
        console.log(data);
        //makeGraph(data)
        hideIntro();
        updateGraph();
      });
}


function hideIntro() {
  console.log("hey");
  var intro = $("#intro");
  intro.empty();
  intro.html('<div class="row" style="padding-bottom: 15px" style="margin:0 auto"> <div class="col-xs-12" > <div id="chartHere" class="col-xs-8"> </div> <div class="col-xs-4">printStats(data) </div>  </div> </div>');
  $("#chartHere").append('<canvas id ="lineChart" ></canvas>');
  var data = [{"week":"2015-06-15 - 2015-06-21", "total": 495},
 {"week":"2015-06-22 - 2015-06-28", "total": 2540},
 {"week":"2015-06-29 - 2015-07-05", "total": 2443},
 {"week":"2015-07-07 - 2015-07-13", "total": 2182},
 {"week":"2015-07-12 - 2015-07-18", "total": 2411}];
  makeGraph(data);
}

function printStats(inputData)
{
    var statistics = [];
    for (var i = 0; i < inputData.length; i++) {
        console.log(inputData[i]);
        console.log(inputData[i].total);
        statistics[i] = inputData[i].total;
    }


}

function updateGraph() {
    var graph = document.getElementById("lineChart")
    console.log(graph)
    graph.style.display = 'block';
}


function updateGraph() {
  var graph = document.getElementById('lineChartContainer')
    graph.style.display = 'block';
}

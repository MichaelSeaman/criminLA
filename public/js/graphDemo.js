//first graph demo

function makeGraph(inputData) {

	//data loop
	var myArray = [];
	for (var i = 0; i < inputData.length; i++) {
		console.log(inputData[i]);
		console.log(inputData[i].total);
	 	myArray[i] = inputData[i].total; 
	}
	const CHART = document.getElementById("lineChart");
	console.log(CHART);
	let lineChart = new Chart(CHART, {
		type: 'line',
		data: data =  {
			labels: ["January", "December"],
	        datasets: [{
	            label: '# of Crimes',
	            data: myArray,
	            backgroundColor: [
	                'rgba(3, 99, 132, 0.2)',/*the graph fill color*/
	                'rgba(54, 162, 235, 0.2)',/*the graph fill color*/
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    //Change ticks-- just put in the first and last pt

	                }
	            }]
	        }
	    }
	});
}

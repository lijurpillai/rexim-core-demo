"use strict";

var twitterChartDirective = angular.module("TwitterChart",[]);

//generate random number for twitter charts
function randNumTW(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
};

twitterChartDirective.directive('twitterchart',function(){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
	
			/* ---------- Chart with points ---------- */
			if(angular.element("#twitterChart").length){
				var followers = [[1, 5+randNumTW()], [2, 10+randNumTW()], [3, 15+randNumTW()], [4, 20+randNumTW()],[5, 25+randNumTW()],[6, 30+randNumTW()],[7, 35+randNumTW()],[8, 40+randNumTW()],[9, 45+randNumTW()],[10, 50+randNumTW()],[11, 55+randNumTW()],[12, 60+randNumTW()],[13, 65+randNumTW()],[14, 70+randNumTW()],[15, 75+randNumTW()],[16, 80+randNumTW()],[17, 85+randNumTW()],[18, 90+randNumTW()],[19, 85+randNumTW()],[20, 80+randNumTW()],[21, 75+randNumTW()],[22, 80+randNumTW()],[23, 75+randNumTW()],[24, 70+randNumTW()],[25, 65+randNumTW()],[26, 75+randNumTW()],[27,80+randNumTW()],[28, 85+randNumTW()],[29, 90+randNumTW()], [30, 95+randNumTW()]];
				var plot = $.plot(angular.element("#twitterChart"),
					   [ { data: followers, label: "Followers"} ], {
						   series: {
							   lines: { show: true,
										lineWidth: 2,
										fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.2 } ] }
									 },
							   points: { show: true, 
										 lineWidth: 2 
									 },
							   shadowSize: 0
						   },
						   grid: { hoverable: true, 
								   clickable: true, 
								   tickColor: "#f9f9f9",
								   borderWidth: 0
								 },
						   colors: ["#1BB2E9"],
							xaxis: {ticks:6, tickDecimals: 0},
							yaxis: {ticks:3, tickDecimals: 0},
						 });
		
				var showTooltip = function(x, y, contents) {
					angular.element('<div id="tooltip">' + contents + '</div>').css( {
						position: 'absolute',
						display: 'none',
						top: y + 5,
						left: x + 5,
						border: '1px solid #fdd',
						padding: '2px',
						'background-color': '#dfeffc',
						opacity: 0.80
					}).appendTo("body").fadeIn(200);
				};
		
				var previousPoint = null;
				angular.element("#twitterChart").bind("plothover", function (event, pos, item) {
					angular.element("#x").text(pos.x.toFixed(2));
					angular.element("#y").text(pos.y.toFixed(2));
		
						if (item) {
							if (previousPoint != item.dataIndex) {
								previousPoint = item.dataIndex;
		
								angular.element("#tooltip").remove();
								var x = item.datapoint[0].toFixed(2),
									y = item.datapoint[1].toFixed(2);
		
								showTooltip(item.pageX, item.pageY,
											item.series.label + " of " + x + " = " + y);
							}
						}
						else {
							angular.element("#tooltip").remove();
							previousPoint = null;
						}
				});
			
			}
		}
	};
});
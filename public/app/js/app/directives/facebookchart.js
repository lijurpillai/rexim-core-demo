"use strict";

var facebookChartDirective = angular.module("FacebookChart",[]);

function randNumFB(){
	return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
}

/* ---------- Chart with points ---------- */
facebookChartDirective.directive('facebookchart',function(){
	
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			if(angular.element("#facebookChart").length){
				var likes = [[1, 5+randNumFB()], [2, 10+randNumFB()], [3, 15+randNumFB()], [4, 20+randNumFB()],[5, 25+randNumFB()],[6, 30+randNumFB()],[7, 35+randNumFB()],[8, 40+randNumFB()],[9, 45+randNumFB()],[10, 50+randNumFB()],[11, 55+randNumFB()],[12, 60+randNumFB()],[13, 65+randNumFB()],[14, 70+randNumFB()],[15, 75+randNumFB()],[16, 80+randNumFB()],[17, 85+randNumFB()],[18, 90+randNumFB()],[19, 85+randNumFB()],[20, 80+randNumFB()],[21, 75+randNumFB()],[22, 80+randNumFB()],[23, 75+randNumFB()],[24, 70+randNumFB()],[25, 65+randNumFB()],[26, 75+randNumFB()],[27,80+randNumFB()],[28, 85+randNumFB()],[29, 90+randNumFB()], [30, 95+randNumFB()]];
				var plot = $.plot(angular.element("#facebookChart"),
					   [ { data: likes, label: "Fans"} ], {
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
						   colors: ["#3B5998"],
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
				angular.element("#facebookChart").bind("plothover", function (event, pos, item) {
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
"use strict";

var statusChartDirective = angular.module("StatusChart",[]);

/* ---------- Chart with points ---------- */
	
statusChartDirective.directive('statuschart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			scope.$watch(attr.statuschart,function statusChartWatchAction(chartData) {
				//var chartData = scope.$eval(attr.statuschart);
				if(angular.element("#stats-chart2").length){				
					var pageviews = chartData.pageviews;
					var visits = chartData.visits;
					var visitors = chartData.visitors;
					var newVisitors = chartData.newVisitors;
					var previousPoint = null;
				
					var plot = $.plot(angular.element("#stats-chart2"),
					   [ { data: visits, label: "Visits"},
						 { data: pageviews, label: "Pageviews"},
						 { data: visitors, label: "Visitors" }, 
						 { data: newVisitors, label: "New Visitors"} ], {
						   series: {
							   lines: { show: true,
										lineWidth: 2
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
						 legend: {
								    show: false
								},	
						   colors: ["#bdea74", "#eae874", "#2FABE9", "#FA5833"],
							xaxis: {ticks:15, tickDecimals: 0},
							yaxis: {ticks:5, tickDecimals: 0},
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
		
					angular.element("#stats-chart2").bind("plothover", function (event, pos, item) {
						angular.element("#x").text(pos.x.toFixed(2));
						angular.element("#y").text(pos.y.toFixed(2));
						if (item) {
							if (previousPoint != item.dataIndex) {
								previousPoint = item.dataIndex;
		
								angular.element("#tooltip").remove();
								var x = item.datapoint[0].toFixed(2),
									y = item.datapoint[1].toFixed(2);
		
								showTooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
							}
						}else {
							angular.element("#tooltip").remove();
							previousPoint = null;
						}
					});
				}
			});
		}
	};
});
	
	



"use strict";

var verticalThinChartDirective = angular.module("VerticalThinChart",[]);

/* ---------- verticalthinchart ---------- */
verticalThinChartDirective.directive('verticalthinchart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			$log.info("In verticalthinchart");
		    var bars = true;
		    var plotWithOptions = function(data) {
		        $.plot(angular.element("#"+attr.id), [data], {
		            series: {
		                bars: { show: bars, 
								fill: true, 
								barWidth: 0.1, 
								align: "center",
								lineWidth: 5,
								fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
							},
		            },
					grid: { hoverable: true, 
							   clickable: true, 
							   tickColor: "#f6f6f6",
							   borderWidth: 0,
							},
					colors: ["#CBE968"],
					xaxis: {ticks:0, tickDecimals: 0, tickFormatter: function(v, a) {return v; }},
					yaxis: {ticks:5, tickDecimals: 0, tickFormatter: function (v) { return v; }},
		        });
		    };
		    
			scope.$watch(attr.verticalthinchart,function verticalchartWatch(userActiveValue){
				var verticalthinchartData = scope.$eval(attr.verticalthinchart);
				if(angular.element("#"+attr.id).length) {
				    plotWithOptions(verticalthinchartData.data);
				}
			});
		}
	};
	
});
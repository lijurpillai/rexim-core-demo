"use strict";

var realtimeFireChart = angular.module("RealtimeFireChart",[]);

/* ---------- Realtime chart ---------- */
realtimeFireChart.directive('realtimefirechart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			$log.info("In realtimefirechart directive: ");
						
			scope.$watch(attr.realtimefirechart,function realtimeFireChartWatch(value){
				var realTimeData = scope.$eval(attr.realtimefirechart);
				//$log.info(realTimeData);
				if(!angular.equals(undefined,realTimeData) && 
					!angular.equals(undefined,realTimeData.data)){
					var data = realTimeData.data;
					if(angular.element("#"+attr.id).length){
						var options = {
							series: { shadowSize: 1 },
							lines: { fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
							yaxis: { min: 0, max: 100 },
							xaxis: { show: false },
							colors: ["#F4A506"],
							grid: {	tickColor: "#dddddd",
									borderWidth: 0 
							},
						};
						var plot = $.plot(angular.element("#"+attr.id), [data], options);
						plot.setData([data]);
						// since the axes ddataon't change, we don't need to call plot.setupGrid()
						plot.draw();
					}
				}
			});			 
		}
	};
	
});
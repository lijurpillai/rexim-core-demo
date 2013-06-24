"use strict";

var realtimeServerStatusChart = angular.module("RealtimeServerStatusChart",[]);

/* ---------- Realtime chart ---------- */
realtimeServerStatusChart.directive('realtimeserverstatuschart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			$log.info("In realtimeserverstatuschart directive: ");
						
			scope.$watch(attr.realtimeserverstatuschart,function realtimeServerStatusChartWatch(realTimeData){
				//var realTimeData = scope.$eval(attr.realtimeserverstatuschart);
				if(!angular.equals(undefined,realTimeData) && !angular.equals(undefined,realTimeData.data)){
					var data = realTimeData.data, totalPoints = realTimeData.users;
					if(angular.element("#"+attr.id).length){
						var options = {
								series: { shadowSize: 1 },
								lines: { show: true, lineWidth: 3, fill: true, fillColor: { colors: [ { opacity: 0.9 }, { opacity: 0.9 } ] }},
								yaxis: { min: 0, max: 100, tickFormatter: function (v) { return v + "%"; }},
								xaxis: { show: false },
								colors: ["#FA5833"],
								grid: {	tickColor: "#f9f9f9",
										borderWidth: 0, 
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
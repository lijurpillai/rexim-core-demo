"use strict";

var temperatureStatusChartDirective = angular.module("TemperatureStatusChart",[]);

/* ---------- Temperature Status chart ---------- */
/** Add attribute order for assigning values asc & desc**/
temperatureStatusChartDirective.directive('temperaturestatuschart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			var ASC = 'ASC', asc = 'asc';
			var orderValue = attr.order;
			var temp = attr.temperaturestatuschart;
			//$log.info("In temperaturestatuschart: "+temp);
			var temperatureStatus = function(chartValue){				
				var currentElement = angular.element('#'+attr.id);
				currentElement.html(chartValue + '°');
				if(angular.equals(ASC,orderValue) || angular.equals(asc,orderValue)){
					if (temp < 20) {
						currentElement.animate({borderColor: "#67c2ef"}, 'fast');
					} else if (temp > 19 && temp < 40) {
						currentElement.animate({borderColor: "#CBE968"}, 'slow');
					} else if (temp > 39 && temp < 60) {
						currentElement.animate({borderColor: "#eae874"}, 'slow');
					} else if (temp > 59 && temp < 80) {
						currentElement.animate({borderColor: "#fabb3d"}, 'slow');
					} else if (temp > 79 && temp < 100) {
						currentElement.animate({borderColor: "#fa603d"}, 'slow');
					} else {
						currentElement.animate({borderColor: "#ff5454"}, 'slow');
					}
				}else{
					if (temp < 20) {
						currentElement.animate({borderColor: "#ff5454"}, 'fast');
					} else if (temp > 19 && temp < 40) {
						currentElement.animate({borderColor: "#fa603d"}, 'slow');
					} else if (temp > 39 && temp < 60) {
						currentElement.animate({borderColor: "#fabb3d"}, 'slow');
					} else if (temp > 59 && temp < 80) {
						currentElement.animate({borderColor: "#eae874"}, 'slow');
					} else if (temp > 79 && temp < 100) {
						currentElement.animate({borderColor: "#CBE968"}, 'slow');
					} else {
						currentElement.animate({borderColor: "#67c2ef"}, 'slow');
					}
				}
			};
			scope.$watch(attr.temperaturestatuschart,function temperatureStatusChartWatch(value){
				temperatureStatus(value);
			});
			
		}
	};
	
});
"use strict";

var barchartColorSmallDirective = angular.module("BarChartColorSmall",[]);

/* ---------- Bar Stats ---------- */
barchartColorSmallDirective.directive('barchartcolorsmall',function($log){
	return {
		restrict : 'EA',
		compile : function(scope, element, attr){
			//scope.$watch(function barChartColorSmallWatch(scope){
				if (window.devicePixelRatio > 1) {
					angular.element(".bar-stat > .chart").each(function(){
						var chartColor = angular.element(this).css('color');
						$log.info(chartColor);
						angular.element(this).sparkline('html', {
						    type: 'bar',
						    height: '80', // Double pixel number for retina display
							barWidth: '10', // Double pixel number for retina display
							barSpacing: '4', // Double pixel number for retina display
						    barColor: chartColor,
						    negBarColor: '#eeeeee'}
						);
						angular.element(this).css('zoom',0.5);
					});
				} else {
					angular.element(".bar-stat > .chart").each(function(){
						var chartColor = angular.element(this).css('color');
						angular.element(this).sparkline('html', {				
						    type: 'bar',
						    height: '40',
							barWidth: '5',
							barSpacing: '2',
						    barColor: chartColor,
						    negBarColor: '#eeeeee'}
						);
					});
				}
			//});
		}
	};
});
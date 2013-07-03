"use strict";

var verticalchartDirective = angular.module("VerticalChart",[]);

/* ---------- Chart ---------- */
verticalchartDirective.directive('verticalchart',function($log){
	return {
		restrict : 'EA',
		link : function(scope, element, attr){
			scope.$watch(function verticalchartWatch(scope){
				if(angular.element('.verticalChart')) {
					angular.element('.singleBar').each(function(){
						var percent = angular.element(this).find('.value span').html();
						if(!angular.equals(null,percent) && !angular.equals("",percent.trim())){
							//$log.info("percent: "+percent);
							angular.element(this).find('.value').animate({height:percent}, 0, function() {    
								angular.element(this).find('span').fadeIn();
							});
						}
					});
				}
			});
			
		}
	};
	
});
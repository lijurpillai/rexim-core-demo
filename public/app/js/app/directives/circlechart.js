"use strict";

var circlechartDirective = angular.module("CircleChart",[]);

/* ---------- CircleChart ---------- */
circlechartDirective.directive('circlechart',function($log){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			scope.$watch(attr.circlechart,function circlechartWatch(value){
				if(window.devicePixelRatio > 1) {
					angular.element("#"+attr.id).find('.whiteCircle').knob({
				        'min':0,
				        'max':100,
				        'readOnly': true,
				        'width': 240,
				        'height': 240,
						'bgColor': 'rgba(255,255,255,0.5)',
				        'fgColor': 'rgba(255,255,255,0.9)',
				        'dynamicDraw': false,
				        'thickness': 0.2,
				        'tickColorizeValues': true
				    });
					angular.element("#"+attr.id).find('.circleStat').css('zoom',0.5);
					angular.element("#"+attr.id).find('.whiteCircle').css('zoom',0.999);		
				} else {
					angular.element("#"+attr.id).find('.whiteCircle').knob({
				        'min':0,
				        'max':100,
				        'readOnly': true,
				        'width': 120,
				        'height': 120,
						'bgColor': 'rgba(255,255,255,0.5)',
				        'fgColor': 'rgba(255,255,255,0.9)',
				        'dynamicDraw': false,
				        'thickness': 0.2,
				        'tickColorizeValues': true
				    });
				}
			});
		}
	};
	
});
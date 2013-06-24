"use strict";

var progressbarDirective = angular.module("ProgressBar",[]);

/* ---------- Progress  ---------- */

progressbarDirective.directive('progressbar',function($rootElement){
	return {
		restrict : 'EA',
		link : function(scope, element, attr){
			angular.element(".simpleProgress").progressbar({
				value: 89
			});
			angular.element(".progressAnimate").progressbar({
				value: 1,
				create: function() {
					angular.element(".progressAnimate .ui-progressbar-value").animate({"width":"100%"},{
						duration: 10000,
						step: function(now){
							angular.element(".progressAnimateValue").html(parseInt(now)+"%");
						},
						easing: "linear"
					});
				}
			});
			angular.element(".progressUploadAnimate").progressbar({
				value: 1,
				create: function() {
					angular.element(".progressUploadAnimate .ui-progressbar-value").animate({"width":"100%"},{
						duration: 20000,
						easing: 'linear',
						step: function(now){
							angular.element(".progressUploadAnimateValue").html(parseInt(now*40.96)+" Gb");
						},
						complete: function(){
							angular.element(".progressUploadAnimate + .field_notice").html("<span class='must'>Upload Finished</span>");
						} 
					});
				}
			});
			if(angular.element(".taskProgress")) {
				angular.element(".taskProgress").each(function(){
					var endValue = parseInt(angular.element(this).html());
					angular.element(this).progressbar({
						value: endValue
					});
					angular.element(this).parent().find(".percent").html(endValue + "%");
				});
			}
			if(angular.element(".progressBarValue")) {
				angular.element(".progressBarValue").each(function(){
					var endValueHTML = angular.element(this).find(".progressCustomValueVal").html();
					var endValue = parseInt(endValueHTML);
					angular.element(this).find(".progressCustomValue").progressbar({
						value: 1,
						create: function() {
							angular.element(this).find(".ui-progressbar-value").animate({"width": endValue + "%"},{
								duration: 5000,
								step: function(now){
																	
									angular.element(this).parent().parent().parent().find(".progressCustomValueVal").html(parseInt(now)+"%");
								},
								easing: "linear"
							});
						}
					});
					
				});
			
			}
		}
	};
});
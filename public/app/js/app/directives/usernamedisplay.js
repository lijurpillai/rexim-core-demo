"use strict";

var userNameDisplayDirective = angular.module("UserNameDisplay",[]);

/* ---------- UserNameDisplay ---------- */
userNameDisplayDirective.directive('usernamedisplay',function($log,User){
	return {
		restrict : 'A',
		link : function(scope, element, attr){
			scope.$watch(function usernameDisplayWatch(scope){
				 element.html(User.getLoggedUserName());
			});			
		}
	};	
});
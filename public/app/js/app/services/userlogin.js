"use strict";

var loginUserService = angular.module('LoginUserService',[]);

loginUserService.service("User",function($log,$location,$rootScope){
	this.isValidUser = function(){
		var valid = false;
		if(sessionStorage){
			var user = JSON.parse(sessionStorage.getItem("user"));
			//$log.info(user);
			if(!angular.equals(null,user) && !angular.equals(undefined,user) && !angular.equals(undefined,user.name)){
				valid = true;
			}
		}
		return valid;
	};
	
	this.redirectToLogin = function(){
		$location.path('/login');
		if(!$rootScope.$$phase){
            $rootScope.$apply();
        }
	};
	
	this.getLoggedUserName = function(){
		var userName = "";
		if(sessionStorage){
			var user = JSON.parse(sessionStorage.getItem("user"));
			//$log.info(user);
			if(!angular.equals(null,user) && !angular.equals(undefined,user) && !angular.equals(undefined,user.name)){
				userName = user.name;
			}
		}
		return userName;
	};
});
